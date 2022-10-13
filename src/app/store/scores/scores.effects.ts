import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ScoresService } from '../../services/scores.service';
import { AppState } from '../app/app.state';
import { v4 as uuidv4 } from 'uuid';
import { TranslateService } from '@ngx-translate/core';
import * as APP_ACTIONS from '../app/app.actions';
import * as APP_CONSTANTS from '../../models/app/app.constants';
import * as SCORES_ACTIONS from './scores.actions';
import * as SCORES_SELECTORS from './scores.selectors';
import * as SCORES_MODELS from '../../models/scores/scores.models';
import * as PLAYERS_ACTIONS from '../../store/players/players.actions';

@Injectable()
export class ScoresEffects {

  constructor(
    private readonly action$: Actions,
    private readonly store: Store<AppState>,
    private readonly scoresService: ScoresService,
    private readonly translate: TranslateService
  ) {}

  getScoresStorage$ = createEffect(() => this.action$.pipe(
    ofType(SCORES_ACTIONS.getScoresStorage),
    switchMap(() => from(this.scoresService.getScoresFromStorage())
    .pipe(
      mergeMap((scores: SCORES_MODELS.ScoreRecord[]) => ([
        {
          type: SCORES_ACTIONS.SCORES_ACTIONS.SET_SCORES,
          scores
        },
        {
          type: APP_ACTIONS.ACTIONS.INIT_ITEM_READY,
          key: APP_CONSTANTS.APP_SCORES_KEY
        }
      ]))
    ))
  ));

  newScore$ = createEffect(() => this.action$.pipe(
    ofType(SCORES_ACTIONS.newScore),
    concatLatestFrom(() => this.store.select(SCORES_SELECTORS.getNewScoreInfo)),
    switchMap(([action, newScoreInfo]) => {
      const newRecord = {
        date: new Date().getTime(),
        id: uuidv4(),
        player: newScoreInfo.playerId,
        score: action.score
      };
      const newScoresList = [
        ...newScoreInfo.scores,
        newRecord
      ];
      return from (this.scoresService.setNewScore(newScoresList))
        .pipe(
          map(() => ({
              type: SCORES_ACTIONS.SCORES_ACTIONS.SET_SCORES,
              scores: newScoresList
            })
          )
        )
    })
  ));

  removeScores$ = createEffect(() => this.action$.pipe(
    ofType(SCORES_ACTIONS.removeScores),
    concatLatestFrom(() => this.store.select(SCORES_SELECTORS.getScores)),
    switchMap(([action, scores]) => {
      const newScores = scores.filter((score: SCORES_MODELS.ScoreRecord) => score.player !== action.player.id);
      return from (this.scoresService.setNewScore(newScores))
        .pipe(
          mergeMap(() => {
            const actions = [];
            actions.push({
              type: SCORES_ACTIONS.SCORES_ACTIONS.SET_SCORES,
              scores: newScores
            });
            if (action.removePlayer) {
              actions.push({
                type: PLAYERS_ACTIONS.PLAYER_ACTIONS.REMOVE_PLAYER,
                player: action.player
              });
            } else {
              actions.push({
                type: APP_ACTIONS.ACTIONS.SHOW_ALERT,
                options: {
                  showAlert: true,
                  text: this.translate.instant('scores.messages.scoresRemoved'),
                  resetOnClose: true,
                  showAccept: true,
                  AcceptText: this.translate.instant('buttons.ok'),
                  redirectOnAccept: false
                }
              });
            }
            return actions;
          }),
          catchError(() => of(APP_ACTIONS.showToast({
            message: action.removePlayer ?
              this.translate.instant('player.errors.removingPlayer'):
              this.translate.instant('scores.errors.removingScores')
          })))
        )
    }),
  ));
}

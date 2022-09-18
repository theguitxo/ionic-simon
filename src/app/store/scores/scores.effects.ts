import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { from } from "rxjs";
import { map, mergeMap, switchMap, tap } from "rxjs/operators";
import { ScoreRecord } from "src/app/models/scores.model";
import { ScoresService } from "../../services/scores.service";
import { StoreState } from "../store.state";
import * as SCORES_ACTIONS from './scores.actions';
import * as APP_ACTIONS from "../store.actions";
import { APP_SCORES_KEY } from "src/app/models/app.constants";
import * as SCORES_SELECTORS from './scores.selectors';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ScoresEffects {

  constructor(
    private readonly action$: Actions,
    private readonly store: Store<StoreState>,
    private readonly scoresService: ScoresService
  ) {}

  newRecord: ScoreRecord;

  getScoresStorage$ = createEffect(() => this.action$.pipe(
    ofType(SCORES_ACTIONS.getScoresStorage),
    switchMap(() => from(this.scoresService.getScoresFromStorage())
    .pipe(
      mergeMap((scores: ScoreRecord[]) => ([
        {
          type: SCORES_ACTIONS.SCORES_ACTIONS.SET_SCORES,
          scores
        },
        {
          type: APP_ACTIONS.ACTIONS.INIT_ITEM_READY,
          key: APP_SCORES_KEY
        }
      ]))
    ))
  ));

  newScore$ = createEffect(() => this.action$.pipe(
    ofType(SCORES_ACTIONS.newScore),
    concatLatestFrom(() => this.store.select(SCORES_SELECTORS.getNewScoreInfo)),
    switchMap(([action, newScoreInfo]) => {
      this.newRecord = {
        date: new Date().getTime(),
        id: uuidv4(),
        player: newScoreInfo.playerId,
        score: action.score
      };
      const newScoresList = [
        ...newScoreInfo.scores,
        this.newRecord
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
}
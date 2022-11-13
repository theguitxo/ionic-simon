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

/**
 * EN: Effects for the actions of the scores of the game.
 * 
 * ES: Efectos para las acciones de las puntuaciones del juego.
 */
@Injectable()
export class ScoresEffects {

  /**
   * EN: Constructor for the class.
   * 
   * ES: Constructor de la clase.
   * @param {Actions} action$ EN: Class provided by NgRx to access to the actions. / ES: Clase proporcionada por NgRx para acceder a las acciones.
   * @param {Store<AppState>}store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación.
   * @param {ScoresService} scoresService EN: Service for manage the games scores information on the storage. / ES: Servicio para gestionar la información de las puntuaciones de los juegos en el almacenamiento.
   * @param {TranslateService} translate EN: Service of Angular to manage the translations. / ES: Servicio de Angular para gestionar las traducciones. 
   */
  constructor(
    private readonly action$: Actions,
    private readonly store: Store<AppState>,
    private readonly scoresService: ScoresService,
    private readonly translate: TranslateService
  ) {}

  /**
   * EN: Gets the scores list from the local storage.
   * 
   * ES: Obtiene la lista de puntuaciones del almacenamiento local.
   */
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

  /**
   * EN; Saves a new score in the local storage and put it into the state.
   * 
   * ES: Guarda una nueva puntuación en el almacenamiento local y la pone en el estado.
   */
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

  /**
   * EN: Removes scores and a player (according a value of the action).
   * 
   * ES: Elimina puntuaciones y un jugador (según un valor de la acción).
   */
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

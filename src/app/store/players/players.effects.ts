import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { from, of } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { PlayersService } from "../../services/players.service";
import { AppState } from "../app/app.state";
import * as PLAYER_MODELS from '../../models/player/player.models';
import * as PLAYERS_ACTIONS from './players.actions';
import * as PLAYERS_SELECTORS from "./players.selectors";
import * as APP_ACTIONS from "../app/app.actions";
import * as APP_CONSTANTS from "../../models/app/app.constants";

/**
 * EN: Effects for the players actions.
 * 
 * ES: Efectos para las acciones de los jugadores.
 */
@Injectable()
export class PlayersEffects {

  /**
   * EN: Constructor for the class.
   * 
   * ES: Constructor de la clase.
   * @param {Actions} action$ EN: Class provided by NgRx to access to the actions. / ES: Clase proporcionada por NgRx para acceder a las acciones.
   * @param {Store<AppState>} store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación.
   * @param {PlayersService} playersService EN: Service for manage the players information on the storage. / ES: Servicio para gestionar la información de los jugadores en el almacenamiento.
   * @param {TranslateService} translate EN: Service of Angular to manage the translations. / ES: Servicio de Angular para gestionar las traducciones.
   */
  constructor(
    private readonly action$: Actions,
    private readonly store: Store<AppState>,
    private readonly playersService: PlayersService,
    private readonly translate: TranslateService
  ) {}

  /**
   * EN: Gets the players list from the storage.
   * 
   * ES: Obtiene la lista de jugadores del almacenamiento.
   */
  getPlayersStorage$ = createEffect(() => this.action$.pipe(
    ofType(PLAYERS_ACTIONS.getPlayersStorage),
    switchMap(() => from(
        Promise.all([
          this.playersService.getPlayersFromStorage(),
          this.playersService.getCurrentPlayerFromStorage()
        ])
      )
      .pipe(
        mergeMap(([players, currentPlayer]) => ([
          {
            type: PLAYERS_ACTIONS.PLAYER_ACTIONS.SET_PLAYERS_LIST,
            players
          },
          {
            type: PLAYERS_ACTIONS.PLAYER_ACTIONS.SET_CURRENT_PLAYER,
            currentPlayer
          },
          {
            type: APP_ACTIONS.ACTIONS.INIT_ITEM_READY,
            key: APP_CONSTANTS.APP_PLAYERS_KEY
          }
        ]))
      )
    )
  ));

  /**
   * EN: Checks some data before start the process to create a new player.
   * 
   * ES: Comprueba algunos datos antes de iniciar el proceso para crear un nuevo jugador.
   */
  newPlayer$ = createEffect(() => this.action$.pipe(
      ofType(PLAYERS_ACTIONS.newPlayer),
      concatLatestFrom(() => this.store.select(PLAYERS_SELECTORS.getPlayersNames)),
      map(([action, players]) => {
        if (players.map(i => i.toUpperCase()).indexOf(action.player.name.toUpperCase()) > -1) {
          return {
            type: APP_ACTIONS.ACTIONS.SHOW_TOAST,
            message: this.translate.instant('player.errors.userExists', { player: action.player.name })
          };
        }
        return {
          type: PLAYERS_ACTIONS.PLAYER_ACTIONS.SAVE_NEW_PLAYER,
          player: action.player
        };
      })
    )
  );

  /**
   * EN: Saves a new or current player in the storage, according the received action.
   * 
   * ES: Guarda un jugador nuevo o actual en el almacenamiento, según la acción recibida.
   */
  saveNewPlayerChangeCurrent$ = createEffect(() => this.action$.pipe(
    ofType(PLAYERS_ACTIONS.saveNewPlayer, PLAYERS_ACTIONS.changeCurrentPlayer),
    concatLatestFrom(() => this.store.select(PLAYERS_SELECTORS.getPlayers)),
    switchMap(([action, players]) => {
      const isNewPlayer = action.type === PLAYERS_ACTIONS.PLAYER_ACTIONS.SAVE_NEW_PLAYER;
      let newPlayersList: PLAYER_MODELS.Player[];
      if (isNewPlayer) {
        newPlayersList = [...players, action.player];
      } else {
        newPlayersList = players.map(player => ({
          ...player,
          isCurrent: player.id === action.player.id
        }));
      }
      return from(
        Promise.all([
          this.playersService.setPlayersInStorage(newPlayersList),
          this.playersService.setCurrentPlayerInStorage(action.player.id)
        ])
      ).pipe(
        mergeMap(() => {
          const actions = [];
          actions.push({
            type: PLAYERS_ACTIONS.PLAYER_ACTIONS.SET_PLAYERS_LIST,
            players: newPlayersList
          });
          actions.push({
            type: PLAYERS_ACTIONS.PLAYER_ACTIONS.SET_CURRENT_PLAYER,
            currentPlayer: action.player.id
          });
          if (isNewPlayer) {
            actions.push({
              type: APP_ACTIONS.ACTIONS.SHOW_ALERT,
              options: {
                showAlert: true,
                text: this.translate.instant('player.messages.newCreated'),
                resetOnClose: true,
                showAccept: true,
                AcceptText: this.translate.instant('buttons.ok'),
                redirectOnAccept: true
              }
            })
          }
          return actions;
        }),
        catchError(() => of(APP_ACTIONS.showToast({
          message: isNewPlayer ?
          this.translate.instant('player.errors.savingPlayer'):
          this.translate.instant('player.errors.changeCurrent')
        })))
      )
    }))
  );

  /**
   * EN: Saves the current player in the storage.
   * 
   * ES: Guarda el reproductor actual en el almacenamiento.
   */
  saveCurrentPlayer$ = createEffect(() => this.action$.pipe(
    ofType(PLAYERS_ACTIONS.saveCurrentPlayer),
    switchMap(action => from(this.playersService.setCurrentPlayerInStorage(action.currentPlayer))
      .pipe(
        mergeMap(() => [
          {
            type: PLAYERS_ACTIONS.PLAYER_ACTIONS.SET_CURRENT_PLAYER,
            currentPlayer: action.currentPlayer
          },
          {
            type: APP_ACTIONS.ACTIONS.SET_REDIRECT_TO,
            route: '/home'
          }
        ]),
        catchError(() => of(APP_ACTIONS.showToast({ message: this.translate.instant('player.errors.savingCurrentPlayer') })))
      )
    )
  ));

  /**
   * EN: Removes a player from the storage.
   * 
   * ES: Elimina un jugador del almacenamiento.
   */
  removePlayer$ = createEffect(() => this.action$.pipe(
    ofType(PLAYERS_ACTIONS.removePlayer),
    concatLatestFrom(() => this.store.select(PLAYERS_SELECTORS.getPlayers)),
    switchMap(([action, players]) => {
      const newPlayersList = players?.filter(player => player.id !== action.player.id);
      return from(this.playersService.setPlayersInStorage([...newPlayersList]))
        .pipe(
          mergeMap(() => [
            {
              type: PLAYERS_ACTIONS.PLAYER_ACTIONS.SET_PLAYERS_LIST,
              players: [...newPlayersList]
            },
            {
              type: APP_ACTIONS.ACTIONS.SHOW_ALERT,
              options: {
                showAlert: true,
                text: this.translate.instant('player.messages.playerRemoved', { name: action.player.name }),
                resetOnClose: true,
                showAccept: true,
                AcceptText: this.translate.instant('buttons.ok'),
                redirectOnAccept: false
              }
            }
          ]),
          catchError(() => of(APP_ACTIONS.showToast({ message: this.translate.instant('player.errors.savingPlayer') })))
        )
    })
  ));
}

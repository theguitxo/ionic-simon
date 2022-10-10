import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from "@ngrx/store";
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

@Injectable()
export class PlayersEffects {

  constructor(
    private readonly action$: Actions,
    private readonly store: Store<AppState>,
    private readonly playersService: PlayersService,
    private readonly translate: TranslateService
  ) {}

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

  saveNewPlayerChangeCurrent$ = createEffect(() => this.action$.pipe(
    ofType(PLAYERS_ACTIONS.saveNewPlayer, PLAYERS_ACTIONS.changeCurrentPlayer),
    concatLatestFrom(() => this.store.select(PLAYERS_SELECTORS.getPlayers)),
    switchMap(([action, players]) => {
      const isNewPlayer = action.type.toString() === PLAYERS_ACTIONS.PLAYER_ACTIONS.NEW_PLAYER;
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
                redirectOnAccept: true
              }
            }
          ]),
          catchError(() => of(APP_ACTIONS.showToast({ message: this.translate.instant('player.errors.savingPlayer') })))
        )
    })
  ));
}

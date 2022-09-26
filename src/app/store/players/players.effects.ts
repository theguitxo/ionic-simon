import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { from, of } from "rxjs";
import { PlayersService } from "../../services/players.service";
import { StoreState } from "../store.state";
import * as PLAYERS_ACTIONS from './players.actions';
import * as PLAYERS_SELECTORS from "./players.selectors";
import * as APP_ACTIONS from "../store.actions";
import { APP_PLAYERS_KEY } from "../../models/app.constants";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class PlayersEffects {

  constructor(
    private readonly action$: Actions,
    private readonly store: Store<StoreState>,
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
            key: APP_PLAYERS_KEY
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

  saveNewPlayer$ = createEffect(() => this.action$.pipe(
    ofType(PLAYERS_ACTIONS.saveNewPlayer),
    concatLatestFrom(() => this.store.select(PLAYERS_SELECTORS.getPlayers)),
    switchMap(([action, players]) => from(
        Promise.all([
          this.playersService.setPlayersInStorage([...players, action.player]),
          this.playersService.setCurrentPlayerInStorage(action.player.id)
        ])
      ).pipe(
        mergeMap(() => [
          {
            type: PLAYERS_ACTIONS.PLAYER_ACTIONS.SET_PLAYERS_LIST,
            players: [
              ...players,
              action.player
            ]
          },
          {
            type: PLAYERS_ACTIONS.PLAYER_ACTIONS.SET_CURRENT_PLAYER,
            currentPlayer: action.player.id
          },
          {
            type: APP_ACTIONS.ACTIONS.SHOW_ALERT,
            options: {
              showAlert: true,
              text: this.translate.instant('player.messages.newCreated'),
              resetOnClose: true,
              showAccept: true,
              AcceptText: this.translate.instant('buttons.ok'),
              redirectOnAccept: true
            }
          }
        ]),
        catchError(() => of(APP_ACTIONS.showToast({ message: this.translate.instant('player.errors.savingPlayer') })))
      )
    ))
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
}

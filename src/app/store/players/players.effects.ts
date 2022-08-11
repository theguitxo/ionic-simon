import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import * as PLAYERS_ACTIONS from './players.actions';
import * as PLAYERS_SELECTORS from "./players.selectors";
import { PlayersState } from "./players.state";
import { map } from 'rxjs/operators';
import * as APP_ACTIONS from "../store.actions";

@Injectable()
export class PlayersEffects {

  constructor(
    private readonly action$: Actions,
    private readonly store: Store<PlayersState>
  ) {}

  newPlayer$ = createEffect(() => this.action$.pipe(
      ofType(PLAYERS_ACTIONS.newPlayer),
      concatLatestFrom(() => this.store.select(PLAYERS_SELECTORS.getPlayersNames)),
      map(([action, players]) => {
        console.log(action);
        console.log(players);
        if (players.map(i => i.toUpperCase()).indexOf(action.player.toUpperCase()) > -1) {
          return APP_ACTIONS.showToast({
            message: `Palyer ${action.player} exits`
          });
        }
        return APP_ACTIONS.showToast({
          message: `Palyer ${action.player} exits`
        });
      })
    ),
    {
      useEffectsErrorHandler: false 
    }
  );
}

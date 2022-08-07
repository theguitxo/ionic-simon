import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import * as PLAYERS_ACTIONS from './players.actions';
import * as PLAYERS_SELECTORS from "./players.selectors";
import { PlayersState } from "./players.state";
import { tap } from 'rxjs/operators';

@Injectable()
export class PlayersEffects {

  constructor(
    private readonly action$: Actions,
    private readonly store: Store<PlayersState>
  ) {}

  newPlayer$ = createEffect(() => this.action$.pipe(
      ofType(PLAYERS_ACTIONS.PLAYER_ACTIONS.NEW_PLAYER),
      concatLatestFrom(() => this.store.select(PLAYERS_SELECTORS.getPlayersNames)),
      tap(([action, players]) => {
        console.log(action);
        console.log(players);
      })
    ),
    {
      dispatch: false,
      useEffectsErrorHandler: false 
    }
  );
}
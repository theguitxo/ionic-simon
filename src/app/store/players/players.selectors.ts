import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayersState } from "./players.state";

export const playersState = createFeatureSelector<PlayersState>('players');

export const getHasCurrentPlayer = createSelector(
  playersState,
  (state: PlayersState): boolean => !!(state?.currentPlayer)
);

export const getHasPlayers = createSelector(
  playersState,
  (state: PlayersState): boolean => (state?.players?.length > 0)
);

export const getPlayersNames = createSelector(
  playersState,
  (state: PlayersState): Array<string> => state?.players?.map(player => player.name)
);

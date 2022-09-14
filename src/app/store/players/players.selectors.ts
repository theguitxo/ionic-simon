import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Player } from "src/app/models/player.model";
import { PlayersState } from "./players.state";

export const playersState = createFeatureSelector<PlayersState>('players');

export const getHasCurrentPlayer = createSelector(
  playersState,
  (state: PlayersState): boolean => !!(state?.currentPlayer)
);

export const getCurrentPlayer = createSelector(
  playersState,
  (state: PlayersState): string => {
    const current = state?.players?.find(item => item.id === state?.currentPlayer);
    return current?.name;
  }
);

export const getHasPlayers = createSelector(
  playersState,
  (state: PlayersState): boolean => (state?.players?.length > 0)
);

export const getPlayersNames = createSelector(
  playersState,
  (state: PlayersState): string[] => state?.players?.map(player => player.name)
);

export const getPlayers = createSelector(
  playersState,
  (state: PlayersState): Player[] => state?.players
);

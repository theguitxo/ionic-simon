import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Player, PlayerList } from "../../models/player/player.models";
import { PlayersState } from "./players.state";

export const playersState = createFeatureSelector<PlayersState>('players');

export const getHasCurrentPlayer = createSelector(
  playersState,
  (state: PlayersState): boolean => !!(state?.currentPlayer)
);

export const getCurrentPlayer = createSelector(
  playersState,
  (state: PlayersState): Player => {
    const current = state?.players?.find(item => item.id === state?.currentPlayer);
    return current;
  }
);

export const getCurrentPlayerName = createSelector(
  getCurrentPlayer,
  (player: Player): string => player?.name
);

export const getCurrentPlayerId = createSelector(
  getCurrentPlayer,
  (player: Player): string => player?.id
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
  (state: PlayersState): PlayerList[] => (
    state?.players?.map(item => ({
      ...item,
      isCurrent: item.id === state?.currentPlayer
    }))
  )
);

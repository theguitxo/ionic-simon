import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as PLAYER_MODELS from "../../models/player/player.models";
import { PlayersState } from "./players.state";

export const playersState = createFeatureSelector<PlayersState>('players');

export const getAvatarsList = createSelector (
  playersState,
  (state: PlayersState): PLAYER_MODELS.AvatarListItem[] => state?.avatarsList
);

export const getAvatarsListReady = createSelector (
  getAvatarsList,
  (list: PLAYER_MODELS.AvatarListItem[]): boolean => list?.length > 0
);

export const getHasCurrentPlayer = createSelector(
  playersState,
  (state: PlayersState): boolean => !!(state?.currentPlayer)
);

export const getCurrentPlayer = createSelector(
  playersState,
  (state: PlayersState): PLAYER_MODELS.Player => {
    const current = state?.players?.find(item => item.id === state?.currentPlayer);
    return current;
  }
);

export const getCurrentPlayerName = createSelector(
  getCurrentPlayer,
  (player: PLAYER_MODELS.Player): string => player?.name
);

export const getCurrentPlayerId = createSelector(
  getCurrentPlayer,
  (player: PLAYER_MODELS.Player): string => player?.id
);

export const getCurrentPlayerAvatar = createSelector(
  playersState,
  getCurrentPlayer,
  (state: PlayersState, current: PLAYER_MODELS.Player): string => state?.avatarsList?.find(item => item.id === current.avatar)?.path
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
  (state: PlayersState): PLAYER_MODELS.PlayerList[] => (
    state?.players?.map(item => ({
      ...item,
      isCurrent: item.id === state?.currentPlayer,
      avatarPath: state?.avatarsList?.find(avatar => avatar.id === item.avatar)?.path
    }))
  )
);

import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as PLAYER_MODELS from "../../models/player/player.models";
import { PlayersState } from "./players.state";

/**
 * EN: Selector for the state of the players.
 * 
 * ES: Selector para el estado de los jugadores.
 */
export const playersState = createFeatureSelector<PlayersState>('players');

/**
 * EN: Returns the avatars list for the players.
 * 
 * ES: Devuelve la lista de avatares de los jugadores.
 */
export const getAvatarsList = createSelector (
  playersState,
  (state: PlayersState): PLAYER_MODELS.AvatarListItem[] => state?.avatarsList
);

/**
 * EN: Returns if the avatars list is ready to init the application.
 * 
 * ES: Devuelve si la lista de avatares está lista para iniciar la aplicación.
 */
export const getAvatarsListReady = createSelector (
  getAvatarsList,
  (list: PLAYER_MODELS.AvatarListItem[]): boolean => list?.length > 0
);

/**
 * EN: Returns if the current player is setted.
 * 
 * ES: Devuelve si el jugador actual está configurado.
 */
export const getHasCurrentPlayer = createSelector(
  playersState,
  (state: PlayersState): boolean => !!(state?.currentPlayer)
);

/**
 * EN: Returns the current player.
 * 
 * ES: Devuelve el jugador actual.
 */
export const getCurrentPlayer = createSelector(
  playersState,
  (state: PlayersState): PLAYER_MODELS.Player => {
    const current = state?.players?.find(item => item.id === state?.currentPlayer);
    return current;
  }
);

/**
 * EN: Returns the current player name.
 * 
 * ES: Devuelve el nombre del jugador actual.
 */
export const getCurrentPlayerName = createSelector(
  getCurrentPlayer,
  (player: PLAYER_MODELS.Player): string => player?.name
);

/**
 * EN: Returns the current player Id.
 * 
 * ES: Devuelve el ID del jugador actual.
 */
export const getCurrentPlayerId = createSelector(
  getCurrentPlayer,
  (player: PLAYER_MODELS.Player): string => player?.id
);

/**
 * EN: Returns the current player avatar.
 * 
 * ES: Devuelve el avatar del jugador actual.
 */
export const getCurrentPlayerAvatar = createSelector(
  playersState,
  getCurrentPlayer,
  (state: PlayersState, current: PLAYER_MODELS.Player): string => state?.avatarsList?.find(item => item.id === current.avatar)?.path
);

/**
 * EN: Returns if the application has configured game players.
 * 
 * ES: Devuelve si la aplicación tiene jugadores configurados.
 */
export const getHasPlayers = createSelector(
  playersState,
  (state: PlayersState): boolean => (state?.players?.length > 0)
);

/**
 * EN: Returns the list of the players names.
 * 
 * ES: Devuelve la lista de los nombres de los jugadores.
 */
export const getPlayersNames = createSelector(
  playersState,
  (state: PlayersState): string[] => state?.players?.map(player => player.name)
);

/**
 * EN: Returns the players list.
 * 
 * ES: Devuelve la lista de jugadores.
 */
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

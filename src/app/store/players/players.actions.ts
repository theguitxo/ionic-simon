import { createAction, props } from "@ngrx/store";
import * as PLAYER_MODELS from "../../models/player/player.models";

/**
 * EN: Actions for the players.
 * 
 * ES: Acciones para los jugadores.
 */
export enum PLAYER_ACTIONS {
  GET_PLAYERS_STORAGE = '[PLAYER ACTIONS] Get players storage',
  CREATE_AVATARS_LIST = '[PLAYER ACTIONS] Create avatars list',
  NEW_PLAYER = '[PLAYER ACTIONS] New player',
  SAVE_NEW_PLAYER = '[PLAYER ACTIONS] Save new player',
  SET_PLAYERS_LIST = '[PLAYER ACTIONS] Set players list',
  SET_CURRENT_PLAYER = '[PLAYER ACTIONS] Set current player',
  SAVE_CURRENT_PLAYER = '[PLAYER ACTIONS] Save current player',
  REMOVE_PLAYER = '[PLAYER ACTIONS] Remove player',
  CHANGE_CURRENT_PLAYER = '[PLAYER ACTIONS] Change current player'
}

/**
 * EN: Gets the players list from the storage (Indexed DB).
 * 
 * ES: Obtiene la lista de jugadores del almacenamiento (Indexed DB).
 */
export const getPlayersStorage = createAction (
  PLAYER_ACTIONS.GET_PLAYERS_STORAGE
);

/**
 * EN: Create the list of avatars for the players.
 * 
 * ES: Crea la lista de avatares para los jugadores.
 */
export const createAvatarsList = createAction (
  PLAYER_ACTIONS.CREATE_AVATARS_LIST
);

/**
 * EN: Starts the process to create a new player.
 * 
 * ES: Inicia el proceso para crear un nuevo jugador.
 */
export const newPlayer = createAction (
  PLAYER_ACTIONS.NEW_PLAYER,
  props<{
    player: PLAYER_MODELS.Player
  }>()
);

/**
 * EN: Saves a new player in the storage and in the state.
 * 
 * ES: Guarda un nuevo jugador en el almacenamiento y en el estado.
 */
export const saveNewPlayer = createAction (
  PLAYER_ACTIONS.SAVE_NEW_PLAYER,
  props<{
    player: PLAYER_MODELS.Player
  }>()
);

/**
 * EN: Sets the players list in the state.
 * 
 * ES: Establece la lista de jugadores en el estado.
 */
export const setPlayersList = createAction (
  PLAYER_ACTIONS.SET_PLAYERS_LIST,
  props<{
    players: PLAYER_MODELS.Player[]
  }>()
);

/**
 * EN: Sets the current player in the state.
 * 
 * ES: Establece el jugador actual en el estado.
 */
export const setCurrentPlayer = createAction (
  PLAYER_ACTIONS.SET_CURRENT_PLAYER,
  props<{
    currentPlayer: string
  }>()
);

/**
 * EN: Saves the current player in the storage.
 * 
 * ES: Guarda el reproductor actual en el almacenamiento.
 */
export const saveCurrentPlayer = createAction (
  PLAYER_ACTIONS.SAVE_CURRENT_PLAYER,
  props<{
    currentPlayer: string
  }>()
);

/**
 * EN: Removes a players from the storage.
 * 
 * ES: Elimina a los jugadores del almacenamiento.
 */
export const removePlayer = createAction (
  PLAYER_ACTIONS.REMOVE_PLAYER,
  props<{
    player: PLAYER_MODELS.Player
  }>()
);

/**
 * EN: Changes the current player in the storage.
 * 
 * ES: Cambia el jugador actual en el almacenamiento.
 */
export const changeCurrentPlayer = createAction (
  PLAYER_ACTIONS.CHANGE_CURRENT_PLAYER,
  props<{
    player: PLAYER_MODELS.Player
  }>()
);

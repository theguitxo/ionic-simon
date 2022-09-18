import { createAction, props } from "@ngrx/store";
import { Player } from "../../models/player.model";

export enum PLAYER_ACTIONS {
  GET_PLAYERS_STORAGE = '[PLAYER ACTIONS] Get players storage',
  NEW_PLAYER = '[PLAYER ACTIONS] New player',
  SAVE_NEW_PLAYER = '[PLAYER ACTIONS] Save new player',
  SET_PLAYERS_LIST = '[PLAYER ACTIONS] Set players list',
  SET_CURRENT_PLAYER = '[PLAYER ACTIONS] Set current player',
  SAVE_CURRENT_PLAYER = '[PLAYER ACTIONS] Save current player'
}

/**
 * Gets the players list from the storage (Indexed DB)
 */
export const getPlayersStorage = createAction (
  PLAYER_ACTIONS.GET_PLAYERS_STORAGE
);

/**
 * Starts the process to create a new player
 */
export const newPlayer = createAction (
  PLAYER_ACTIONS.NEW_PLAYER,
  props<{
    player: Player
  }>()
);

export const saveNewPlayer = createAction (
  PLAYER_ACTIONS.SAVE_NEW_PLAYER,
  props<{
    player: Player
  }>()
);

export const setPlayersList = createAction (
  PLAYER_ACTIONS.SET_PLAYERS_LIST,
  props<{
    players: Player[]
  }>()
);

export const setCurrentPlayer = createAction (
  PLAYER_ACTIONS.SET_CURRENT_PLAYER,
  props<{
    currentPlayer: string
  }>()
);

export const saveCurrentPlayer = createAction (
  PLAYER_ACTIONS.SAVE_CURRENT_PLAYER,
  props<{
    currentPlayer: string
  }>()
);

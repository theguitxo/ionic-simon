import { createAction, props } from "@ngrx/store";
import * as PLAYERS_MODELS from "../../models/player/player.models";
import * as SCORES_MODELS from "../../models/scores/scores.models";

/**
 * EN: Actions for the scores of the game.
 * 
 * ES: Acciones para las puntuaciones del juego.
 */
export enum SCORES_ACTIONS {
  GET_SCORES_STORAGE = '[SCORES ACTIONS] Get scores storage',
  SET_SCORES = '[SCORES ACTIONS] Set scores',
  NEW_SCORE = '[SCORES ACTIONS] New score',
  REMOVE_SCORES = '[SCORES ACTIONS] Remove scores'
}

/**
 * EN: Gets the scores from the local storage.
 * 
 * ES: Obtiene las puntuaciones del almacenamiento local.
 */
export const getScoresStorage = createAction (
  SCORES_ACTIONS.GET_SCORES_STORAGE
);

/**
 * EN: Sets the scores into the state.
 * 
 * ES: Establece las puntuaciones en el estado.
 */
export const setScores = createAction (
  SCORES_ACTIONS.SET_SCORES,
  props<{
    scores: SCORES_MODELS.ScoreRecord[]
  }>()
);

/**
 * EN: Saves a new game score.
 * 
 * ES: Guarda una nueva puntuación del juego.
 */
export const newScore = createAction (
  SCORES_ACTIONS.NEW_SCORE,
  props<{
    score: number;
  }>()
);

/**
 * EN: Removes the scores for a player.
 * 
 * ES: Elimina las puntuaciones de un jugador.
 */
export const removeScores = createAction (
  SCORES_ACTIONS.REMOVE_SCORES,
  props<{
    player: PLAYERS_MODELS.Player;
    removePlayer: boolean;
  }>()
);

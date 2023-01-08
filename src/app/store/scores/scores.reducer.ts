import { Action, createReducer, on } from "@ngrx/store";
import { ScoreRecord } from "../../models/scores/scores.models";
import { scoresInitialState, ScoreState } from "./scores.state";
import * as SCORES_ACTIONS from '../scores/scores.actions';

/**
 * EN: Creates the reducer for the games scores.
 * 
 * ES: Crea el reducer para las puntuaciones de los juegos.
 */
const _scoresReducer = createReducer (
  scoresInitialState,
  on(SCORES_ACTIONS.setScores, (state: ScoreState, { scores }) => ({ ..._setScores(state, scores)}))
);

/**
 * EN: Reducer for the games scores.
 * 
 * ES: Reductor de las puntuaciones de los juegos.
 * @param {ScoreState} state EN: State for the games scores. / ES: Estado de las puntuaciones de los juegos.
 * @param {Action} action EN: Action to apply over the reducer. / ES:Acción a aplicar sobre el reducer.  
 * @returns {ScoreState} EN: State for the games scores. / ES: Estado de las puntuaciones de los juegos.
 */
export function scoresReducer(state: ScoreState | undefined, action: Action): ScoreState {
  return _scoresReducer(state, action);
}

/**
 * EN: Sets the scores list into the state.
 * 
 * ES: Establece la lista de puntuaciones en el estado.
 * @param {ScoreState} state EN: State for the games scores. / ES: Estado de las puntuaciones de los juegos.
 * @param {ScoreRecord[]} scores EN: Scores list to set into the state. / ES: Lista de puntuaciones para establecer en el estado.
 * @returns {ScoreState} EN: State for the games scores. / ES: Estado de las puntuaciones de los juegos.
 */
export function _setScores(state: ScoreState, scores: ScoreRecord[]): ScoreState {
  return {
    ...state,
    scores
  }
}

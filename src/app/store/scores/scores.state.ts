import { ScoreRecord } from "../../models/scores/scores.models";

/**
 * EN: Interface for the state of the score of the game.
 * 
 * ES: Interfaz para el estado de la puntuación del juego.
 */
export interface ScoreState {
  /**
   * EN: List of games scores.
   * 
   * ES: Lista de puntuaciones de los juegos.
   */
  scores: ScoreRecord[];
}

/**
 * EN: Initial values for the game scores state.
 * 
 * ES: Los valores iniciales para el estado de las puntuaciones del juego.
 */
export const scoresInitialState: ScoreState = {
  scores: []
};

import { createAction, props } from "@ngrx/store";
import { COLOR_CODES } from "src/app/models/game/game.model";

/**
 * EN: Actions for the game.
 * 
 * ES: Acciones para el juego.
 */
export enum GAME_ACTIONS {
  INIT_GAME = '[GAME ACTIONS] Init game',
  STOP_GAME = '[GAME ACTIONS] Stop game',
  RESET_GAME_DATA = '[GAME ACTIONS] Reset game data',
  START_PLAYING_SEQUENCE = '[GAME ACTIONS] Start playing sequence',
  STOP_PLAYING_SEQUENCE = '[GAME ACTIONS] Stop playing sequence',
  NEXT_PLAYING_SEQUENCE = '[GAME ACTIONS] Next playing sequence',
  NEW_IN_SEQUENCE = '[GAME ACTIONS] New in sequence',
  START_PLAYER_ACTION = '[GAME ACTIONS] Start player action',
  CHECK_PLAYER_ACTION = '[GAME ACTIONS] Check player action',
  PAUSE_GAME = '[GAME ACTIONS] Pause game',
  RESUME_GAME = '[GAME ACTONS] Resume game'
}

/**
 * EN: Start a new game.
 * 
 * ES: Inicia una nueva partida.
 */
export const initGame = createAction (
  GAME_ACTIONS.INIT_GAME
);

/**
 * EN: Stops a game.
 * 
 * ES: Detiene un juego.
 */
export const stopGame = createAction (
  GAME_ACTIONS.STOP_GAME
);

/**
 * EN: Resets the data for a game.
 * 
 * ES: Restablece los datos de un juego.
 */
export const resetGameData = createAction(
  GAME_ACTIONS.RESET_GAME_DATA
);

/**
 * EN: Starts to playing a sequence in a game.
 * 
 * ES: Comienza a reproducir una secuencia en una partida.
 */
export const startPlayingSequence = createAction (
  GAME_ACTIONS.START_PLAYING_SEQUENCE
);

/**
 * EN: Stops playing a sequence in a game.
 * 
 * ES: Detiene la reproducción de una secuencia en una partida.
 */
export const stopPlayingSequence = createAction (
  GAME_ACTIONS.STOP_PLAYING_SEQUENCE
);

/**
 * EN: Plays the new color code in the sequence.
 * 
 * ES: Reproduce el nuevo código de color en la secuencia.
 */
export const nextPlayingSequence = createAction (
  GAME_ACTIONS.NEXT_PLAYING_SEQUENCE
);

/**
 * EN: Adds a new color code to the sequence.
 * 
 * ES: Agrega un nuevo código de color a la secuencia.
 */
export const newInSequence = createAction (
  GAME_ACTIONS.NEW_IN_SEQUENCE
);

/**
 * EN: Starts the time to play for the player.
 * 
 * ES: Comienza el tiempo de juego para el jugador.
 */
export const startPlayerAction = createAction (
  GAME_ACTIONS.START_PLAYER_ACTION,
  props<{
    colorCode: COLOR_CODES
  }>()
);

/**
 * EN: Checks the action made by the player.
 * 
 * ES: Comprueba la acción realizada por el jugador.
 */
export const checkPlayerAction = createAction (
  GAME_ACTIONS.CHECK_PLAYER_ACTION
);

/**
 * EN: Pauses the game.
 * 
 * ES: Pausa la partida.
 */
export const pauseGame = createAction (
  GAME_ACTIONS.PAUSE_GAME
);

/**
 * EN: Resumes the game, after pause it.
 * 
 * ES: Reanuda la partida, después de pausarla.
 */
export const resumeGame = createAction (
  GAME_ACTIONS.RESUME_GAME
);

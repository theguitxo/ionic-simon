import { createFeatureSelector, createSelector } from "@ngrx/store";
import { COLOR_CODES, CurrentColorPlay } from "src/app/models/game/game.model";
import { GameState } from "./game.state";

/**
 * EN: Selector for the state of the game.
 * 
 * ES: Selector de estado del juego.
 */
export const gameState = createFeatureSelector<GameState>('game');

/**
 * EN: Returns if the game was started.
 * 
 * ES: Devuelve si el juego se inició.
 */
export const getGameStarted = createSelector(
  gameState,
  (state: GameState): boolean => state?.gameStarted
);

/**
 * EN: Returns if the game buttons are enabled .
 * 
 * ES: Devuelve si los botones del juego están activados.
 */
export const getButtonsEnabled = createSelector(
  gameState,
  (state: GameState): boolean => (
    state?.gameStarted &&
    state?.playerSequence?.length !== state?.gameSequence?.length &&
    !state?.playingSequence &&
    !state?.buttonsBlocked &&
    !state?.sequenceChecked
  )
);

/**
 * EN: Returns if is playing the sequence to repeat.
 * 
 * ES: Devuelve si se está reproduciendo la secuencia a repetir.
 */
export const getPlayingSequence = createSelector(
  gameState,
  (state: GameState): boolean => state?.playingSequence
);

/**
 * EN: Returns the sequence to repeat.
 * 
 * ES: Devuelve la secuencia a repetir.
 */
export const getGameSequence = createSelector(
  gameState,
  (state: GameState): COLOR_CODES[] => state?.gameSequence
);

/**
 * EN: Returns if the game is over.
 * 
 * ES: Regresa si el juego ha terminado.
 */
export const getGameOver = createSelector(
  gameState,
  (state: GameState): boolean => state?.gameOver
);

/**
 * EN: Returns the score of the game.
 * 
 * ES: Devuelve la puntuación del juego.
 */
export const getScore = createSelector(
  gameState,
  (state: GameState): number => state?.score
);

/**
 * EN: Returns if the game must continue after checking the button pressed by the player.
 * 
 * ES: Devuelve si el juego debe continuar después de verificar el botón presionado por el jugador.
 */
export const getContinueGame = createSelector(
  gameState,
  (state: GameState): boolean => (state?.sequenceChecked && !state?.gameOver && !state.gamePaused)
);

/**
 * EN: Returns the code of the color to play when is playing the sequence to repeat.
 * 
 * ES: Devuelve el código del color a reproducir cuando se está reproduciendo la secuencia a repetir.
 */
export const getColorCodePlayInSequence = createSelector (
  gameState,
  (state: GameState): COLOR_CODES | null => state?.indexPlayingSequence < 0 ? null : state?.gameSequence[state?.indexPlayingSequence]
);

/**
 * EN: Returns the information about the color to play when is playing the sequence to repeat.
 * 
 * ES: Devuelve la información sobre el color a reproducir cuando se está reproduciendo la secuencia a repetir.
 */
export const getPlayingInSequence = createSelector(
  gameState,
  getColorCodePlayInSequence,
  (state: GameState, colorCode: COLOR_CODES | null): CurrentColorPlay => {
    return {
      index: state?.indexPlayingSequence,
      colorCodePlaying: colorCode,
      soundPath: state?.colorAudios?.get(colorCode)
    }
  }
);

/**
 * EN: Returns the color code to check in the player sequence.
 * 
 * ES: Devuelve el código de color para verificar en la secuencia del jugador.
 */
export const getColorCodePlayerCheck = createSelector (
  gameState,
  (state: GameState): COLOR_CODES | null => state?.playerCodeCheck
);

/**
 * EN: Returns the path to the audio file of the color code to check in the player sequence.
 * 
 * ES: Devuelve la ruta al archivo de audio del código de color para verificar la secuencia del reproductor.
 */
export const getAudioColorCodePlayerCheck = createSelector(
  gameState,
  getColorCodePlayerCheck,
  (state: GameState, colorCode: COLOR_CODES | null): string => state?.colorAudios?.get(colorCode)
);

/**
 * EN: Returns the message to show in the bottom of the game page.
 * 
 * ES: Devuelve el mensaje para mostrar en la parte inferior de la página del juego.
 */
export const getGameMessage = createSelector(
  gameState,
  (state: GameState): string => state?.gameMessage
);

/**
 * EN: Returns if must disable the stop game button.
 * 
 * ES: Devuelve si debe deshabilitar el botón de detener el juego.
 */
export const getDisableStopGameButton = createSelector(
  gameState,
  (state: GameState): boolean => (!state?.gameStarted || state?.buttonsBlocked || state?.sequenceChecked || state?.playingSequence)
);

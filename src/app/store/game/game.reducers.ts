import { Action, createReducer, on } from "@ngrx/store";
import { gameInitialState, GameState } from "./game.state";
import * as ACTIONS from './game.actions';
import { COLOR_CODES } from "../../models/game/game.model";

/**
 * EN: List of color codes.
 * 
 * ES: Lista de códigos de color.
 */
const colorCodes = Object.values(COLOR_CODES)?.filter(value => parseInt(<string>value));

/**
 * EN: Creates the reducer for the game actions.
 * 
 * ES: Crea el reducer para las acciones del juego.
 */
const _gameReducer = createReducer (
  gameInitialState,
  on(ACTIONS.initGame, (state: GameState) => ({..._initGame(state)})),
  on(ACTIONS.stopGame, (state: GameState) => ({..._stopGame(state)})),
  on(ACTIONS.resetGameData, (state: GameState) => ({..._resetGameData(state)})),
  on(ACTIONS.newInSequence, (state: GameState) => ({..._newInSequence(state)})),
  on(ACTIONS.startPlayingSequence, (state: GameState) => ({..._startStopPlayingSequence(state, true)})),
  on(ACTIONS.stopPlayingSequence, (state: GameState) => ({..._startStopPlayingSequence(state, false)})),
  on(ACTIONS.nextPlayingSequence, (state: GameState) => ({..._nextPlayingSequence(state)})),
  on(ACTIONS.startPlayerAction, (state: GameState, {colorCode}) => ({..._startPlayerAction(state, colorCode)})),
  on(ACTIONS.checkPlayerAction, (state: GameState) => ({..._checkPlayerAction(state)})),
  on(ACTIONS.pauseGame, (state: GameState) => ({..._pauseGame(state)})),
  on(ACTIONS.resumeGame, (state: GameState) => ({..._resumeGame(state)}))
);

/**
 * EN: Reducer for the game actions.
 * 
 * ES: Reducer de las acciones del juego.
 * @param {GameState} state EN: State of the game./ ES: State del juego.
 * @param {Action} action EN: Action to apply over the reducer. / ES:Acción a aplicar sobre el reducer. 
 * @returns {GameState} EN: State of the game./ ES: State del juego.
 */
export function gameReducer(state: GameState | undefined, action: Action): GameState {
  return _gameReducer(state, action);
}

/**
 * EN: Inits a new game.
 * 
 * ES: Inicia un nuevo juego.
 * @param {GameState} state EN: State of the game./ ES: State del juego.
 * @returns {GameState} EN: State of the game./ ES: State del juego.
 */
function _initGame(state: GameState): GameState {
  return {
    ...state,
    gameStarted: true,
    colorCodePlaying: null
  };
}

/**
 * EN: Stops a game.
 * 
 * ES: Detiene un juego.
 * @param {GameState} state EN: State of the game./ ES: State del juego.
 * @returns {GameState} EN: State of the game./ ES: State del juego. 
 */
function _stopGame(state: GameState): GameState {
  return {
    ...state,
    gameStarted: false,
    indexPlayingSequence: -1,
    colorCodePlaying: null
  };
}

/**
 * EN: Resets the data of a game.
 * 
 * ES: Restablece los datos de un juego.
 * @param {GameState} state EN: State of the game./ ES: State del juego.
 * @returns {GameState} EN: State of the game./ ES: State del juego.
 */
function _resetGameData(state: GameState): GameState {
  return {
    ...state,
    gameSequence: [],
    playerSequence: [],
    playingSequence: false,
    gameOver: false,
    score: 0,
    buttonsBlocked: false,
    sequenceChecked: false
  };
}

/**
 * EN: Adds a new color in the sequence to repeat.
 * 
 * ES: Añade un nuevo color en la secuencia a repetir.
 * @param {GameState} state EN: State of the game./ ES: State del juego.
 * @returns {GameState} EN: State of the game./ ES: State del juego.
 */
function _newInSequence(state: GameState): GameState {
  let number = new Uint16Array(1);
  window.crypto.getRandomValues(number);
  const randomNumber = parseFloat(`0.${number[0]}`);
  const index = Math.floor(randomNumber * colorCodes.length);
  const newValue = <COLOR_CODES>colorCodes[index];
  return {
    ...state,
    gameSequence: [
      ...state.gameSequence,
      newValue
    ],
    playerSequence: []
  }
}

/**
 * EN: Starts or stops to play the sequence to repeat.
 * 
 * ES: Inicia o detiene la reproducción de la secuencia a repetir.
 * @param {GameState} state EN: State of the game./ ES: State del juego.
 * @param {boolean} value EN: The value that indicates if must start or stop play the sequence. / ES: El valor que indica si se debe iniciar o detener la reproducción de la secuencia.
 * @returns {GameState} EN: State of the game./ ES: State del juego.
 */
function _startStopPlayingSequence(state: GameState, value: boolean): GameState {
  return {
    ...state,
    playingSequence: value,
    indexPlayingSequence: 0,
    gameMessage: value ? 'player.messages.playingSequence' : '',
    sequenceChecked: false
  };
}

/**
 * EN: Sets the next color to play in the sequence to repeat.
 * 
 * ES: Establece el siguiente color para jugar en la secuencia para repetir.
 * @param {GameState} state EN: State of the game./ ES: State del juego.
 * @returns {GameState} EN: State of the game./ ES: State del juego.
 */
function _nextPlayingSequence(state: GameState): GameState {
  const newIndex = state?.indexPlayingSequence + 1;
  const stillItemsInSequence = state?.gameSequence[newIndex] !== undefined;
  return {
    ...state,
    indexPlayingSequence: state?.gameSequence[newIndex] ? newIndex : -1,
    playingSequence: stillItemsInSequence,
    gameMessage: (stillItemsInSequence && state.gameStarted) ? state.gameMessage : 'player.messages.repeatSequence'
  }
}

/**
 * EN: Sets the application to wait about the player action.
 * 
 * ES: Configura la aplicación para esperar la acción del jugador.
 * @param {GameState} state EN: State of the game./ ES: State del juego.
 * @param {COLOR_CODES} colorCode EN: Code of the color pressed by the player to check if is correct. / ES: Código del color pulsado por el jugador para comprobar si es correcto.
 * @returns {GameState} EN: State of the game./ ES: State del juego.
 */
function _startPlayerAction(state: GameState, colorCode: COLOR_CODES): GameState {
  return {
    ...state,
    buttonsBlocked: true,
    sequenceChecked: false,
    playerCodeCheck: colorCode
  };
}

/**
 * EN: Checks the player action.
 * 
 * ES: Comprueba la acción del jugador.
 * @param {GameState} state EN: State of the game./ ES: State del juego.
 * @returns {GameState} EN: State of the game./ ES: State del juego.
 */
function _checkPlayerAction(state: GameState): GameState {
  const gameSequence = state?.gameSequence;
  const playerSequenceCheck = [
    ...state?.playerSequence,
    state?.playerCodeCheck
  ];
  const gameSequenceCheck = gameSequence.slice(0, playerSequenceCheck.length);
  const isOk = gameSequenceCheck?.join() === playerSequenceCheck?.join();
  const sequenceChecked = gameSequence?.length === playerSequenceCheck?.length;

  return {
    ...state,
    score: state.score + Number(sequenceChecked && isOk),
    gameOver: !isOk,
    playerSequence: playerSequenceCheck,
    playerCodeCheck: null,
    buttonsBlocked: false,
    sequenceChecked,
    gameMessage: sequenceChecked ? '' : state.gameMessage
  };
}

/**
 * EN: Pauses a game.
 * 
 * ES: Pausa un juego.
 * @param {GameState} state EN: State of the game./ ES: State del juego.
 * @returns {GameState} EN: State of the game./ ES: State del juego.
 */
function _pauseGame(state: GameState): GameState {
  return {
    ...state,
    gamePaused: true
  };
}

/**
 * EN: Resumes a game, when is paused.
 * 
 * ES: Reanuda un juego, cuando está en pausa.
 * @param {GameState} state EN: State of the game./ ES: State del juego.
 * @returns {GameState} EN: State of the game./ ES: State del juego.
 */
function _resumeGame(state: GameState): GameState {
  return {
    ...state,
    gamePaused: false
  };
}

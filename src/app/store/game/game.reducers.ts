import { Action, createReducer, on } from "@ngrx/store";
import { gameInitialState, GameState } from "./game.state";
import * as ACTIONS from './game.actions';
import { COLOR_CODES } from "../../models/game/game.model";

const colorCodes = Object.values(COLOR_CODES)?.filter(value => parseInt(<string>value));

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

export function gameReducer(state: GameState | undefined, action: Action): GameState {
  return _gameReducer(state, action);
}

function _initGame(state: GameState): GameState {
  return {
    ...state,
    gameStarted: true,
    colorCodePlaying: null
  };
}

function _stopGame(state: GameState): GameState {
  return {
    ...state,
    gameStarted: false,
    indexPlayingSequence: -1,
    colorCodePlaying: null
  };
}

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
    ]
  }
}

function _startStopPlayingSequence(state: GameState, value: boolean): GameState {
  return {
    ...state,
    playingSequence: value,
    indexPlayingSequence: 0,
    gameMessage: value ? 'player.messages.playingSequence' : '',
    sequenceChecked: false
  };
}

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

function _startPlayerAction(state: GameState, colorCode: COLOR_CODES): GameState {
  return {
    ...state,
    buttonsBlocked: true,
    sequenceChecked: false,
    playerCodeCheck: colorCode
  };
}

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
    playerSequence: sequenceChecked ? [] : playerSequenceCheck,
    playerCodeCheck: null,
    buttonsBlocked: false,
    sequenceChecked,
    gameMessage: sequenceChecked ? '' : state.gameMessage
  };
}

function _pauseGame(state: GameState): GameState {
  return {
    ...state,
    gamePaused: true
  };
}

function _resumeGame(state: GameState): GameState {
  return {
    ...state,
    gamePaused: false
  };
}

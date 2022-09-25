import { Action, createReducer, on } from "@ngrx/store";
import { gameInitialState, GameState } from "./game.state";
import * as ACTIONS from './game.actions';
import { COLOR_CODES } from "../../models/game.model";

const colorCodes = Object.values(COLOR_CODES)?.filter(value => parseInt(<string>value));

const _gameReducer = createReducer (
  gameInitialState,
  on(ACTIONS.initGame, (state: GameState) => ({..._initGame(state)})),
  on(ACTIONS.stopGame, (state: GameState) => ({..._stopGame(state)})),
  on(ACTIONS.resetGameData, (state: GameState) => ({..._resetGameData(state)})),
  on(ACTIONS.newInSequence, (state: GameState) => ({..._newInSequence(state)})),
  on(ACTIONS.startPlayingSequence, (state: GameState) => ({..._startStopPlayingSequence(state, true)})),
  on(ACTIONS.stopPlayingSequence, (state: GameState) => ({..._startStopPlayingSequence(state, false)})),
  on(ACTIONS.startPlayerAction, (state) => ({..._startPlayerAction(state)})),
  on(ACTIONS.checkPlayerAction, (state: GameState, { colorCode }) => ({..._checkPlayerAction(state, colorCode)}))
);

export function gameReducer(state: GameState | undefined, action: Action): GameState {
  return _gameReducer(state, action);
}

function _initGame(state: GameState): GameState {
  return {
    ...state,
    gameStarted: true
  };
}

function _stopGame(state: GameState): GameState {
  return {
    ...state,
    gameStarted: false
  };
}

function _resetGameData(state: GameState): GameState {
  return {
    ...state,
    playerSequence: [],
    gameSequence: [],
    score: 0,
    gameOver: false
  };
}

function _newInSequence(state: GameState): GameState {
  const index = Math.floor(Math.random() * colorCodes.length);
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
    playingSequence: value
  };
}

function _startPlayerAction(state: GameState): GameState {
  return {
    ...state,
    buttonsBlocked: true,
    sequenceChecked: false
  };
}

function _checkPlayerAction(state: GameState, colorCode: COLOR_CODES): GameState {
  const gameSequence = state?.gameSequence;
  const playerSequenceCheck = [
    ...state?.playerSequence,
    colorCode
  ];
  const gameSequenceCheck = gameSequence.slice(0, playerSequenceCheck.length);
  const isOk = gameSequenceCheck?.join() === playerSequenceCheck?.join();
  const sequenceChecked = gameSequence?.length === playerSequenceCheck?.length;

  return {
    ...state,
    score: state.score + Number(sequenceChecked && isOk),
    gameOver: !isOk,
    playerSequence: sequenceChecked ? [] : playerSequenceCheck,
    buttonsBlocked: false,
    sequenceChecked
  };
}

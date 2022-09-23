import { Action, createReducer, on } from "@ngrx/store";
import { gameInitialState, GameState } from "./game.state";
import * as ACTIONS from './game.actions';
import { COLOR_CODES } from "../../models/game.model";

const colorCodes = Object.values(COLOR_CODES)?.filter(value => parseInt(<string>value));

const _gameReducer = createReducer (
  gameInitialState,
  on(ACTIONS.initGame, (state: GameState) => ({..._initGame(state)})),
  on(ACTIONS.stopGame, (state: GameState) => ({..._stopGame(state)})),
  on(ACTIONS.newInSequence, (state: GameState) => ({..._newInSequence(state)})),
  on(ACTIONS.playSequence, (state: GameState) => ({..._playSequence(state)}))
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

function _newInSequence(state: GameState): GameState {
  const index = Math.floor(Math.random() * colorCodes.length);
  const newValue = <COLOR_CODES>colorCodes[index];
  const index2 = Math.floor(Math.random() * colorCodes.length);
  const newValue2 = <COLOR_CODES>colorCodes[index2];
  const index3 = Math.floor(Math.random() * colorCodes.length);
  const newValue3 = <COLOR_CODES>colorCodes[index3];
  const index4 = Math.floor(Math.random() * colorCodes.length);
  const newValue4 = <COLOR_CODES>colorCodes[index4];
  return {
    ...state,
    gameSequence: [
      ...state.gameSequence,
      newValue,
      newValue2,
      newValue3,
      newValue4
    ]
  }
}

function _playSequence(state: GameState): GameState {
  return {
    ...state,
    playingSequence: true
  };
}

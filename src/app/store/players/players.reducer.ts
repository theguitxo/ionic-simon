import { Action, createReducer, on } from "@ngrx/store";
import { playersInitialState, PlayersState } from "./players.state";
import * as ACTIONS from "./players.actions";
import { Player } from '../../models/player.model';

const _playersRecuder = createReducer (
  playersInitialState,
  on(ACTIONS.setPlayersList, (state: PlayersState, { players }) => ({..._setPlayersList(state, players)})),
  on(ACTIONS.setCurrentPlayer, (state: PlayersState, { currentPlayer }) => ({..._setCurrentPlayer(state, currentPlayer)}))
);

export function playersReducer(state: PlayersState | undefined, action: Action): PlayersState {
  return _playersRecuder(state, action);
}

export function _setPlayersList(state: PlayersState, players: Player[]): PlayersState {
  console.log({
    ...state,
    players
  });
  return {
    ...state,
    players
  }
}

export function _setCurrentPlayer(state: PlayersState, currentPlayer: string): PlayersState {
  return {
    ...state,
    currentPlayer
  }
}

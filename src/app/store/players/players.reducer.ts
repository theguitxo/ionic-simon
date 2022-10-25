import { Action, createReducer, on } from "@ngrx/store";
import { playersInitialState, PlayersState } from "./players.state";
import * as ACTIONS from "./players.actions";
import * as PLAYER_MODELS from '../../models/player/player.models';

const _playersRecuder = createReducer (
  playersInitialState,
  on(ACTIONS.createAvatarsList, (state: PlayersState) => ({..._createAvatarList(state)})),
  on(ACTIONS.setPlayersList, (state: PlayersState, { players }) => ({..._setPlayersList(state, players)})),
  on(ACTIONS.setCurrentPlayer, (state: PlayersState, { currentPlayer }) => ({..._setCurrentPlayer(state, currentPlayer)}))
);

export function playersReducer(state: PlayersState | undefined, action: Action): PlayersState {
  return _playersRecuder(state, action);
}

export function _createAvatarList(state: PlayersState): PlayersState {
  return {
    ...state,
    avatarsList: new Array(16).fill('').map((_i, index) => {
      const fileNumber = `0${index + 1}`.slice(-2);
      return {
        id: index + 1,
        path: `/assets/avatar/avatar_${fileNumber}.svg`
      }
    })
  }
}

export function _setPlayersList(state: PlayersState, players: PLAYER_MODELS.Player[]): PlayersState {
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

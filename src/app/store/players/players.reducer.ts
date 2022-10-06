import { Action, createReducer, on } from "@ngrx/store";
import { playersInitialState, PlayersState } from "./players.state";
import * as ACTIONS from "./players.actions";
import * as PLAYER_MODEL from '../../models/player/player.model';
import * as PLAYER_CONSTANTS from '../../models/player/player.constants';

const _playersRecuder = createReducer (
  playersInitialState,
  on(ACTIONS.setPlayersList, (state: PlayersState, { players }) => ({..._setPlayersList(state, players)})),
  on(ACTIONS.setCurrentPlayer, (state: PlayersState, { currentPlayer }) => ({..._setCurrentPlayer(state, currentPlayer)})),
  on(ACTIONS.showPlayerMenu, (state: PlayersState, { player }) => ({..._showPlayerMenu(state, player)}))
);

export function playersReducer(state: PlayersState | undefined, action: Action): PlayersState {
  return _playersRecuder(state, action);
}

export function _setPlayersList(state: PlayersState, players: PLAYER_MODEL.Player[]): PlayersState {
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

export function _showPlayerMenu(state: PlayersState, player: PLAYER_MODEL.Player): PlayersState {
  return {
    ...state,
    showPlayerMenu: true,
    playerMenuOptions: [
      PLAYER_CONSTANTS.OPTIONS_MENU.DELETE_PLAYER,
      PLAYER_CONSTANTS.OPTIONS_MENU.RESET_SCORES
    ]
  }
}

export function _resetPlayerMenu(state: PlayersState): PlayersState {
  return {
    ...state,
    showPlayerMenu: false,
    playerMenuOptions: []
  }
}

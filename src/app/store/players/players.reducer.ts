import { Action, createReducer, on } from "@ngrx/store";
import { playersInitialState, PlayersState } from "./players.state";
import * as ACTIONS from "./players.actions";
import * as PLAYER_MODELS from '../../models/player/player.models';

/**
 * EN: Creates the reducer for the player actions.
 * 
 * ES: Crea el reductor para las acciones del jugador.
 */
const _playersRecuder = createReducer (
  playersInitialState,
  on(ACTIONS.createAvatarsList, (state: PlayersState) => ({..._createAvatarList(state)})),
  on(ACTIONS.setPlayersList, (state: PlayersState, { players }) => ({..._setPlayersList(state, players)})),
  on(ACTIONS.setCurrentPlayer, (state: PlayersState, { currentPlayer }) => ({..._setCurrentPlayer(state, currentPlayer)}))
);

/**
 * EN: Reducer for the player actions.
 * 
 * ES: Reducer de las acciones del jugador.
 * @param {AppState} state EN: State of the player./ ES: State del jugador.
 * @param {Action} action EN: Action to apply over the reducer. / ES:Acción a aplicar sobre el reducer.
 * @returns {AppState} state EN: State of the player./ ES: State del jugador.
 */
export function playersReducer(state: PlayersState | undefined, action: Action): PlayersState {
  return _playersRecuder(state, action);
}

/**
 * EN: Sets the avatars list for use in the players configuration.
 * 
 * ES: Establece la lista de avatares para su uso en la configuración de jugadores.
 * @param {AppState} state EN: State of the player./ ES: State del jugador.
 * @returns {AppState} state EN: State of the player./ ES: State del jugador.
 */
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

/**
 * EN: Sets the players list into the state.
 * 
 * ES: Establece la lista de jugadores en el estado.
 * @param {AppState} state EN: State of the player./ ES: State del jugador.
 * @param {Player[]} players EN: Players list to store into the state. / ES: Lista de jugadores para almacenar en el estado.
 * @returns {AppState} state EN: State of the player./ ES: State del jugador.
 */
export function _setPlayersList(state: PlayersState, players: PLAYER_MODELS.Player[]): PlayersState {
  return {
    ...state,
    players
  }
}

/**
 * EN: Sets the current player into the state.
 * 
 * ES: Establece el reproductor actual en el estado.
 * @param {AppState} state EN: State of the player./ ES: State del jugador.
 * @param {string} currentPlayer EN: Id of the current player. / ES: Id del jugador actual.
 * @returns {AppState} state EN: State of the player./ ES: State del jugador.
 */
export function _setCurrentPlayer(state: PlayersState, currentPlayer: string): PlayersState {
  return {
    ...state,
    currentPlayer
  }
}

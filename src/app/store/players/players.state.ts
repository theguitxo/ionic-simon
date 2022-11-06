import * as PLAYER_MODELS from "../../models/player/player.models";

/**
 * EN: Interface for the state of the player.
 * 
 * ES: Interfaz para el estado del jugador.
 */
export interface PlayersState {
  /**
   * EN: Players list of the application.
   * 
   * ES: Lista de jugadores de la aplicación.
   */
  players: Array<PLAYER_MODELS.Player>;
  /**
   * EN: Identification of the current player.
   * 
   * ES: Identificación del jugador actual.
   */
  currentPlayer: string;
  /**
   * EN: Avatars list for the players configuration.
   * 
   * ES: Lista de avatares para la configuración de los jugadores.
   */
  avatarsList: PLAYER_MODELS.AvatarListItem[];
}

/**
 * EN: Initial values for the player state.
 * 
 * ES: Valores iniciales para el estado del jugador.
 */
export const playersInitialState: PlayersState = {
  players: [],
  currentPlayer: null,
  avatarsList: []
};

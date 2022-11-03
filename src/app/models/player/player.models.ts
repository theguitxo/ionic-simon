/**
 * EN: Information about a player of the application.
 * 
 * ES: Información sobre un jugador de la aplicación.
 */
export interface Player {
  /**
   * EN: Identification of the player.
   * 
   * ES: Identificación del jugador.
   */  
  id: string;
  /**
   * EN: Name of the player.
   * 
   * ES: Nombre del jugador.
   */  
  name: string;
  /**
   * EN: Identification of the avatar of the player.
   * 
   * ES: Identificación del avatar del jugador.
   */  
  avatar: number;
}

/**
 * EN: Information about a player to show in a list.
 * 
 * ES: Información sobre un jugador para mostrar en una lista.
 */
export interface PlayerList extends Player {
  /**
   * EN: Indicator if the player is the current or not.
   * 
   * ES: Indicador si el jugador es el actual o no.
   */
  isCurrent: boolean;
  /**
   * EN: Path to the file of the avatar.
   * 
   * ES: Ruta al archivo del avatar.
   */
  avatarPath: string;
}

/**
 * EN: Information about an avatar to show in a list.
 * 
 * ES: Información sobre un avatar para mostrar en una lista.
 */
export interface AvatarListItem {
  /**
   * EN: Identification of the avatar.
   * 
   * ES: Identificación del avatar.
   */   
  id: number;
  /**
   * EN: Path to the file of the avatar.
   * 
   * ES: Ruta al archivo del avatar.
   */  
  path: string;
}

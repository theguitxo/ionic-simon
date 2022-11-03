/**
 * EN: Information about a game score.
 * 
 * ES: Información sobre la puntuación de un juego.
 */
export interface ScoreRecord {
  /**
   * EN: Identification of the register.
   * 
   * ES: Identificación del registro.
   */
  id: string;
  /**
   * EN: Identification of the player.
   * 
   * ES: Identificación del jugador.
   */  
  player: string;
  /**
   * EN: Date of the game.
   * 
   * ES: Fecha del juego.
   */  
  date: number;
  /**
   * EN: Date of the game, formatted according the language of the application.
   * 
   * ES: Fecha del juego, formateada según el idioma de la aplicación.
   */  
  dateFormatted?: string;
  /**
   * EN: Score of the game.
   * 
   * ES: Puntuación del juego.
   */  
  score: number;
}

/**
 * EN: Information about the scores of a player.
 * 
 * ES: Información sobre las puntuaciones de un jugador.
 */
export interface ScoresInfo {
  /**
   * EN: Identification of the player.
   * 
   * ES: Identificación del jugador.
   */  
  playerId: string;
  /**
   * EN: Scores list of the player.
   * 
   * ES: Lista de puntuaciones del jugador.
   */  
  scores: ScoreRecord[];
}

/**
 * EN: Information about the list shown in the scores page.
 * 
 * ES: Información sobre la lista que se muestra en la página de puntuaciones.
 */
export interface ScoresListItem {
  /**
   * EN: Identification of the player.
   * 
   * ES: Identificación del jugador.
   */   
  player: string;
  /**
   * EN: Name of the player.
   * 
   * ES: Nombre del jugador.
   */  
  playerName: string;
  /**
   * EN: Total scores of the player.
   * 
   * ES: Puntuaciones totales del jugador.
   */  
  totalScore: number;
  /**
   * EN: List of scores of the player.
   * 
   * ES: Lista de puntuaciones del jugador.
   */  
  scoresList: ScoreRecord[];
    /**
   * EN: Indicator if the player has only an score.
   * 
   * ES: Indicador si el jugador solo tiene una puntuación.
   */
  onlyOneScore: boolean;
  /**
   * EN: Number of scores of a player.
   * 
   * ES: Número de puntuaciones de un jugador.
   */  
  totalScores: number;
  /**
   * EN: Path to the file of the avatar.
   * 
   * ES: Ruta al archivo del avatar.
   */ 
  playerAvatarPath?: string;
}

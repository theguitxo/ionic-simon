import { COLOR_CODES } from "src/app/models/game/game.model";

/**
 * EN: Interface for the state of the game.
 * 
 * ES: Interfaz para el estado del juego.
 */
export interface GameState {
  /**
   * EN: If buttons are blocked (no action on press) or not.
   * 
   * ES: Si los botones están bloqueados (sin acción al presionar) o no.
   */
  buttonsBlocked: boolean;
  /**
   * EN: Code of the color that is currently playing.
   * 
   * ES: Código del color que se está reproduciendo actualmente.
   */
  colorCodePlaying: COLOR_CODES;
  /**
   * EN: Paths to the audio files of the color buttons.
   * 
   * ES: Rutas a los archivos de audio de los botones de colores.
   */  
  colorAudios: Map<COLOR_CODES, string>;
  /**
   * EN: If the game is over or not.
   * 
   * ES: Si el juego ha terminado o no.
   */  
  gameOver: boolean;
  /**
   * EN: If the game was started or not.
   * 
   * ES: Si el juego se inició o no.
   */  
  gameStarted: boolean;
  /**
   * EN: The sequence that must repeat.
   * 
   * ES: La secuencia que debe repetirse.
   */  
  gameSequence: COLOR_CODES[];
  /**
   * EN: The index in the sequence that is playing.
   * 
   * ES: El índice en la secuencia que se está reproduciendo.
   */
  indexPlayingSequence: number;
  /**
   * EN: Color code pressed by the player being checked.
   * 
   * ES: Código de color presionado por el jugador que se está revisando.
   */
  playerCodeCheck: COLOR_CODES;
  /**
   * EN: The sequence of the player.
   * 
   * ES: La secuencia del jugador.
   */
  playerSequence: COLOR_CODES[];
  /**
   * EN: If is playing the sequence to repeat or not.
   * 
   * ES: Si se está reproduciendo la secuencia a repetir o no.
   */
  playingSequence: boolean;
  /**
   * EN: Score of the game.
   * 
   * ES: Puntuación del juego.
   */
  score: number;
  /**
   * EN: If the sequence of the player was checked or not.
   * 
   * ES: Si la secuencia del jugador fue verificada o no.
   */
  sequenceChecked: boolean;
  /**
   * EN: Message about the game to show it at page bottom.
   * 
   * ES: Mensaje sobre el juego para mostrarlo en la parte inferior de la página.
   */
  gameMessage: string;
  /**
   * EN: If the game is paused or not.
   * 
   * ES: Si el juego está en pausa o no.
   */
  gamePaused: boolean;
}

/**
 * EN: Initial values for the game state.
 * 
 * ES: Valores iniciales para el estado del juego.
 */
export const gameInitialState: GameState = {
  buttonsBlocked: false,
  colorCodePlaying: null,
  colorAudios: new Map()
    .set(COLOR_CODES.BLUE, './assets/audios/blue.wav')
    .set(COLOR_CODES.RED, './assets/audios/red.wav')
    .set(COLOR_CODES.YELLOW, './assets/audios/yellow.wav')
    .set(COLOR_CODES.GREEN, './assets/audios/green.wav'),
  gameOver: false,
  gameStarted: false,
  gameSequence: [],
  indexPlayingSequence: -1,
  playerCodeCheck: null,
  playerSequence: [],
  playingSequence: false,
  score: 0,
  sequenceChecked: false,
  gameMessage: '',
  gamePaused: false
};

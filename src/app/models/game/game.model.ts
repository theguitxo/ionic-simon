/**
 * EN: Codes for identify each color.
 * 
 * ES: Códigos para identificar cada color.
 */
export enum COLOR_CODES {
  BLUE = 1,
  RED = 2,
  YELLOW = 3,
  GREEN = 4
}

/**
 * EN: Information about the color that is playing.
 * 
 * ES: Información sobre el color que está jugando.
 */
export interface CurrentColorPlay {
  /**
   * EN: Index into the playing sequence.
   * 
   * ES: Índice en la secuencia de reproducción.
   */
  index: number;
  /**
   * EN: Code color to play.
   * 
   * ES: Código de color para reproducir
   */
  colorCodePlaying: COLOR_CODES;
  /**
   * EN: Path to the file with the sound.
   * 
   * ES: Ruta al archivo con el sonido.
   */
  soundPath: null | string;
}

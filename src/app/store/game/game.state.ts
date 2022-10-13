import { COLOR_CODES } from "src/app/models/game/game.model";

export interface GameState {
  buttonsBlocked: boolean;
  colorCodePlaying: COLOR_CODES;
  colorAudios: Map<COLOR_CODES, string>;
  gameOver: boolean;
  gameStarted: boolean;
  gameSequence: COLOR_CODES[];
  indexPlayingSequence: number;
  playerCodeCheck: COLOR_CODES;
  playerSequence: COLOR_CODES[];
  playingSequence: boolean;
  score: number;
  sequenceChecked: boolean;
  gameMessage: string;
  gamePaused: boolean;
}

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

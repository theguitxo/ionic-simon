import { COLOR_CODES } from "src/app/models/game.model";

export interface GameState {
  gameStarted: boolean;
  gameSequence: COLOR_CODES[];
  playerSequence: COLOR_CODES[];
  playingSequence: boolean;
  gameOver: boolean;
  score: number;
  buttonsBlocked: boolean;
  sequenceChecked: boolean;
}

export const gameInitialState: GameState = {
  gameStarted: false,
  gameSequence: [],
  playerSequence: [],
  playingSequence: false,
  gameOver: false,
  score: 0,
  buttonsBlocked: false,
  sequenceChecked: false
};

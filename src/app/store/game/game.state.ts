import { COLOR_CODES } from "src/app/models/game.model";

export interface GameState {
  gameStarted: boolean;
  buttonsEnabled: boolean;
  gameSequence: COLOR_CODES[];
  playingSequence: boolean;
}

export const gameInitialState: GameState = {
  gameStarted: false,
  buttonsEnabled: false,
  gameSequence: [],
  playingSequence: false
};

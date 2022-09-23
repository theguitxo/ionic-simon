import { createAction } from "@ngrx/store";

export enum GAME_ACTIONS {
  INIT_GAME = '[GAME ACTIONS] Init game',
  STOP_GAME = '[GAME ACTIONS] Stop game',
  PLAY_SEQUENCE = '[GAME ACTIONS] Play sequence',
  STOP_SEQUENCE = '[GAME ACTIONS] Stop sequence',
  NEW_IN_SEQUENCE = '[GAME ACTIONS] New in sequence'
}

export const initGame = createAction (
  GAME_ACTIONS.INIT_GAME
);

export const stopGame = createAction (
  GAME_ACTIONS.STOP_GAME
);

export const playSequence = createAction (
  GAME_ACTIONS.PLAY_SEQUENCE
);

export const stopSequence = createAction (
  GAME_ACTIONS.STOP_SEQUENCE
);

export const newInSequence = createAction (
  GAME_ACTIONS.NEW_IN_SEQUENCE
)

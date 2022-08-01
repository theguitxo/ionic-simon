import { createAction } from "@ngrx/store";

export enum ACTIONS {
  START_GAME = '[SIMON] Start Game'
}

export const startGame = createAction (
  ACTIONS.START_GAME
);

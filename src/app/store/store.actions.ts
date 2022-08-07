import { createAction, props } from "@ngrx/store";

export enum ACTIONS {
  START_GAME = '[APP] Start Game',
  SHOW_TOAST = '[APP] Show toast',
  RESET_TOAST = '[APP] Reset toast'
}

export const startGame = createAction (
  ACTIONS.START_GAME
);

export const showToast = createAction (
  ACTIONS.SHOW_TOAST,
  props<{
    message: string,
    duration?: number
  }>()
);

export const resetToast = createAction (
  ACTIONS.RESET_TOAST
);

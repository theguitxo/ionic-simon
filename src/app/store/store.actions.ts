import { createAction, props } from "@ngrx/store";
import { languageTypeInfo } from "../models/app.models";

export enum ACTIONS {
  START_GAME = '[APP] Start Game',
  SHOW_TOAST = '[APP] Show toast',
  RESET_TOAST = '[APP] Reset toast',
  SET_LANGUAGE = '[APP] Set language'
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

export const setLanguage = createAction (
  ACTIONS.SET_LANGUAGE,
  props<{
    infoType: languageTypeInfo,
    value: string
  }>()
);

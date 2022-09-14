import { createAction, props } from "@ngrx/store";
import { languageTypeInfo } from "../models/app.models";

export enum ACTIONS {
  START_GAME = '[APP] Start Game',
  SHOW_TOAST = '[APP] Show toast',
  RESET_TOAST = '[APP] Reset toast',
  SHOW_ALERT = '[APP] Show alert',
  RESET_ALERT = '[APP] Reset alert',
  INIT_LANGUAGES = '[APP] Init languages',
  SET_LANGUAGE = '[APP] Set language',
  SAVE_LANGUAGE_STORAGE = '[APP] Save language storage',
  INIT_ITEM_READY = '[APP] Init item ready'
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

export const showAlert = createAction (
  ACTIONS.SHOW_ALERT,
  props<{
    text: string
  }>()
);

export const resetAlert = createAction (
  ACTIONS.RESET_ALERT
);

export const setLanguage = createAction (
  ACTIONS.SET_LANGUAGE,
  props<{
    infoType: languageTypeInfo,
    value: string
  }>()
);

export const initLanguages = createAction (
  ACTIONS.INIT_LANGUAGES
);

export const saveLanguageStorage = createAction (
  ACTIONS.SAVE_LANGUAGE_STORAGE,
  props<{
    language: string
  }>()
);

export const initItemReady = createAction (
  ACTIONS.INIT_ITEM_READY,
  props<{
    key: string
  }>()
);

import { createAction, props } from "@ngrx/store";
import * as APP_MODELS from "../../models/app/app.models";
import * as APP_CONSTANTS from '../../models/app/app.constants';

export enum ACTIONS {
  SHOW_TOAST = '[APP] Show toast',
  RESET_TOAST = '[APP] Reset toast',
  SHOW_ALERT = '[APP] Show alert',
  RESET_ALERT = '[APP] Reset alert',
  INIT_LANGUAGES = '[APP] Init languages',
  SET_LANGUAGE = '[APP] Set language',
  SAVE_LANGUAGE_STORAGE = '[APP] Save language storage',
  INIT_ITEM_READY = '[APP] Init item ready',
  SET_REDIRECT_TO = '[APP] Set redirect to',
  SHOW_ACTION_SHEET = '[APP] Show action sheet',
  RESET_ACTION_SHEET = '[APP] Reset action sheet',
  AVATARS_LIST_OK = '[APP] Avatars list ok'
}

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
    options: APP_MODELS.AppAlertOptions
  }>()
);

export const resetAlert = createAction (
  ACTIONS.RESET_ALERT
);

export const setLanguage = createAction (
  ACTIONS.SET_LANGUAGE,
  props<{
    infoType: APP_CONSTANTS.languageTypeInfo,
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

export const setRedirectTo = createAction (
  ACTIONS.SET_REDIRECT_TO,
  props<{
    route: string
  }>()
);

export const showActionSheet = createAction (
  ACTIONS.SHOW_ACTION_SHEET,
  props<{
    options: APP_MODELS.AppActionSheetOptions
  }>()
);

export const resetActionSheet = createAction (
  ACTIONS.RESET_ACTION_SHEET
);

export const avatarsListOk = createAction (
  ACTIONS.AVATARS_LIST_OK
);

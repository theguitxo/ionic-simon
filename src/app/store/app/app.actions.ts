import { createAction, props } from "@ngrx/store";
import * as APP_MODELS from "../../models/app/app.models";
import * as APP_CONSTANTS from '../../models/app/app.constants';

/**
 * EN: Actions for the application.
 * 
 * ES: Acciones para la aplicación.
 */
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

/**
 * EN: Shows a short message in the bottom of the screen.
 * 
 * ES: Muestra un mensaje corto en la parte inferior de la pantalla.
 */
export const showToast = createAction (
  ACTIONS.SHOW_TOAST,
  props<{
    message: string,
    duration?: number
  }>()
);

/**
 * EN: Resets the information used for show a short message in the page bottom.
 * 
 * ES: Restablece la información utilizada para mostrar un mensaje corto en la parte inferior de la página.
 */
export const resetToast = createAction (
  ACTIONS.RESET_TOAST
);

/**
 * EN: Shows a message in a pop-up.
 * 
 * ES: Muestra un mensaje en un pop-up.
 */
export const showAlert = createAction (
  ACTIONS.SHOW_ALERT,
  props<{
    options: APP_MODELS.AppAlertOptions
  }>()
);

/**
 * EN: Resets the information used for show a message in a pop-up.
 * 
 * ES: Restablece la información utilizada para mostrar un mensaje en una ventana emergente.
 */
export const resetAlert = createAction (
  ACTIONS.RESET_ALERT
);

/**
 * EN: Sets the language, chosen by the player or getted as default on init the application.
 * 
 * ES: Establece el idioma, elegido por el jugador u obtenido por defecto al iniciar la aplicación.
 */
export const setLanguage = createAction (
  ACTIONS.SET_LANGUAGE,
  props<{
    infoType: APP_CONSTANTS.languageTypeInfo,
    value: string
  }>()
);

/**
 * EN: Inits the actions to get the language of the application when it is started.
 * 
 * ES: Inicia las acciones para obtener el idioma de la aplicación cuando se inicia.
 */
export const initLanguages = createAction (
  ACTIONS.INIT_LANGUAGES
);

/**
 * EN: Saves the language chosen into the local storage.
 * 
 * ES: Guarda el idioma elegido en el almacenamiento local.
 */
export const saveLanguageStorage = createAction (
  ACTIONS.SAVE_LANGUAGE_STORAGE,
  props<{
    language: string
  }>()
);

/**
 * EN: It establishes that some of the elements necessary to start the application are ready.
 * 
 * ES: Establece que algunos de los elementos necesarios para iniciar la aplicación están listos.
 */
export const initItemReady = createAction (
  ACTIONS.INIT_ITEM_READY,
  props<{
    key: string
  }>()
);

/**
 * EN: Sets the route to redirect.
 * 
 * ES: Establece la ruta a redirigir.
 */
export const setRedirectTo = createAction (
  ACTIONS.SET_REDIRECT_TO,
  props<{
    route: string
  }>()
);

/**
 * EN: Shows a options menu from the bottom of the page.
 * 
 * ES: Muestra un menú de opciones en la parte inferior de la página.
 */
export const showActionSheet = createAction (
  ACTIONS.SHOW_ACTION_SHEET,
  props<{
    options: APP_MODELS.AppActionSheetOptions
  }>()
);

/**
 * EN: Resets the information used to show the menu from the page bottom.
 * 
 * ES: Restablece la información utilizada para mostrar el menú desde la parte inferior de la página.
 */
export const resetActionSheet = createAction (
  ACTIONS.RESET_ACTION_SHEET
);

/**
 * EN: Sets that the avatars list is ready.
 * 
 * ES: Establece que la lista de avatares está lista.
 */
export const avatarsListOk = createAction (
  ACTIONS.AVATARS_LIST_OK
);

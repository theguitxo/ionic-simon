import { Action, createReducer, on } from "@ngrx/store";
import { initialState, AppState } from "./app.state";
import * as ACTIONS from "./app.actions";
import * as APP_CONSTANTS from "../../models/app/app.constants";
import * as APP_MODELS from "../../models/app/app.models";

/**
 * EN: Creates the reducer for the application actions.
 * 
 * ES: Crea el reducer para las acciones de la aplicación.
 */
const _appReducer = createReducer (
  initialState,
  on(ACTIONS.showToast, (state: AppState, { message, duration }) => ({..._showToast(state, message, duration)})),
  on(ACTIONS.resetToast, (state: AppState) => ({..._resetToast(state)})),
  on(ACTIONS.showAlert, (state: AppState, { options }) => ({..._showAlert(state, options)})),
  on(ACTIONS.resetAlert, (state: AppState) => ({..._resetAlert(state)})),
  on(ACTIONS.setLanguage, (state: AppState, { infoType, value }) => ({..._setLanguage(state, infoType, value)})),
  on(ACTIONS.initItemReady, (state: AppState, { key }) => ({..._initItemReady(state, key)})),
  on(ACTIONS.setRedirectTo, (state: AppState, { route }) => ({..._setRedirectTo(state, route)})),
  on(ACTIONS.showActionSheet, (state: AppState, { options }) => ({..._showActionSheet(state, options)})),
  on(ACTIONS.resetActionSheet, (state: AppState) => ({..._resetActionSheet(state)})),
  on(ACTIONS.avatarsListOk, (state: AppState) => ({..._initItemReady(state, APP_CONSTANTS.APP_PLAYERS_AVATARS_LIST)}))
);

/**
 * EN: Reducer for the application actions.
 * 
 * ES: Reducer de las acciones de la aplicación.
 * @param {AppState} state EN: State of the application./ ES: State de la aplicación.
 * @param {Action} action EN: Action to apply over the reducer. / ES:Acción a aplicar sobre el reducer.
 * @returns {AppState} state EN: State of the application./ ES: State de la aplicación.
 */
export function appReducer(state: AppState | undefined, action: Action): AppState {
  return _appReducer(state, action)
}

/**
 * EN: Shows a short message in the bottom of the screen.
 * 
 * ES: Muestra un mensaje corto en la parte inferior de la pantalla.
 * @param {AppState} state EN: State of the application./ ES: State de la aplicación. 
 * @param {string} message EN: The short message to show in the page bottom. / ES: El mensaje corto para mostrar en la parte inferior de la página.
 * @param {number} [duration] EN: Time that must shown the message. / ES: Tiempo que debe mostrarse el mensaje.
 * @returns {AppState} EN: State of the application./ ES: State de la aplicación.
 */
function _showToast(state: AppState, message: string, duration?: number): AppState {
  return {
    ...state,
    toastOptions: {
      showToast: true,
      toastMessage: message,
      toastDuration: duration ?? APP_CONSTANTS.DEFAULT_TOAST_DURATION
    }
  }
}

/**
 * EN: Resets the information used for show a short message in the page bottom.
 * 
 * ES: Restablece la información utilizada para mostrar un mensaje corto en la parte inferior de la página.
 * @param {AppState} state EN: State of the application./ ES: State de la aplicación. 
 * @returns {AppState} EN: State of the application./ ES: State de la aplicación.
 */
function _resetToast(state: AppState): AppState {
  return {
    ...state,
    toastOptions: {
      showToast: false,
      toastMessage: '',
      toastDuration: APP_CONSTANTS.DEFAULT_TOAST_DURATION
    }
  }
}

/**
 * EN: Shows a message in a pop-up.
 * 
 * ES: Muestra un mensaje en un pop-up.
 * @param {AppState} state EN: State of the application./ ES: State de la aplicación. 
 * @param {AppAlertOptions} options EN: Options to show a message in a pop-up. / ES: Opciones para mostrar un mensaje en un pop-up.
 * @returns {AppState} EN: State of the application./ ES: State de la aplicación.
 */
function _showAlert(state: AppState, options: APP_MODELS.AppAlertOptions): AppState {
  return {
    ...state,
    alertOptions: {
      ...state.alertOptions,
      ...options
    }
  }
}

/**
 * EN: Resets the information used for show a message in a pop-up.
 * 
 * ES: Restablece la información utilizada para mostrar un mensaje en una ventana emergente.
 * @param {AppState} state EN: State of the application./ ES: State de la aplicación. 
 * @returns {AppState} EN: State of the application./ ES: State de la aplicación.
 */
function _resetAlert(state: AppState): AppState {
  return {
    ...state,
    alertOptions: {
      showAlert: false,
      text: '',
      resetOnClose: true,
      showAccept: false,
      showCancel: false,
      AcceptText: '',
      CancelText: '',
      redirectOnAccept: false,
      redirectOnCancel: false,
      additionalAcceptActions: [],
      additionalCancelActions: []
    }
  }
}

/**
 * EN: Sets the language, chosen by the player or getted as default on init the application.
 * 
 * ES: Establece el idioma, elegido por el jugador u obtenido por defecto al iniciar la aplicación.
 * @param {AppState} state EN: State of the application./ ES: State de la aplicación. 
 * @param {languageTypeInfo} infoType EN: Info type which will be saved. / ES: Tipo de información que se guardará.
 * @param {string} value EN: Language code to save. / ES: Código de idioma para guardar.
 * @returns {AppState} EN: State of the application./ ES: State de la aplicación.
 */
function _setLanguage(state: AppState, infoType: APP_CONSTANTS.languageTypeInfo, value: string): AppState {
  return {
    ...state,
    deviceLanguage: (infoType === 'device' || infoType === 'both') ? value : state.deviceLanguage,
    userLanguage: (infoType === 'user' || infoType === 'both') ? value : state.userLanguage
  }
}

/**
 * EN: It establishes that some of the elements necessary to start the application are ready.
 * 
 * ES: Establece que algunos de los elementos necesarios para iniciar la aplicación están listos.
 * @param {AppState} state EN: State of the application./ ES: State de la aplicación. 
 * @param {string} key EN: Identification of the item that is ready. / ES: Identificación del artículo que está listo.
 * @returns {AppState} EN: State of the application./ ES: State de la aplicación.
 */
function _initItemReady(state: AppState, key: string): AppState {
  return {
    ...state,
    itemsReady: state.itemsReady.set(key, true)
  }
}

/**
 * EN: Sets the route to redirect.
 * 
 * ES: Establece la ruta a redirigir.
 * @param {AppState} state EN: State of the application./ ES: State de la aplicación. 
 * @param {string} redirectTo EN: The route to redirect. / ES: La ruta a redirigir.
 * @returns {AppState} EN: State of the application./ ES: State de la aplicación.
 */
function _setRedirectTo(state: AppState, redirectTo: string): AppState {
  return {
    ...state,
    redirectTo
  }
}

/**
 * EN: Shows an options menu from the bottom of the page.
 * 
 * ES: Muestra un menú de opciones en la parte inferior de la página.
 * @param {AppState} state EN: State of the application./ ES: State de la aplicación. 
 * @param {AppActionSheetOptions} options EN: Options for show the menu. / ES: Opciones para mostrar el menú.
 * @returns {AppState} EN: State of the application./ ES: State de la aplicación.
 */
function _showActionSheet(state: AppState, options: APP_MODELS.AppActionSheetOptions): AppState {
  return {
    ...state,
    actionSheetOptions: {
      ...options,
      showActionSheet: true
    }
  }
}

/**
 * EN: Resets the information used to show the menu from the page bottom.
 * 
 * ES: Restablece la información utilizada para mostrar el menú desde la parte inferior de la página.
 * @param {AppState} state EN: State of the application./ ES: State de la aplicación. 
 * @returns {AppState} EN: State of the application./ ES: State de la aplicación.
 */
function _resetActionSheet(state: AppState): AppState {
  return {
    ...state,
    actionSheetOptions: {
      showActionSheet: false,
      header: '',
      subHeader: '',
      buttons: []
    }
  }
}

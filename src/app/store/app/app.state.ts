import * as APP_CONSTANTS from "../../models/app/app.constants";
import * as APP_MODELS from "../../models/app/app.models";

/**
 * EN: Interface for the state of the application.
 * 
 * ES: Interfaz para el estado de la aplicación.
 */
export interface AppState {
  /**
   * EN: Language of the device.
   * 
   * ES: Idioma del dispositivo.
   */
  deviceLanguage?: string;
  /**
   * EN: Language chosen by the player.
   * 
   * ES: Idioma elegido por el jugador.
   */  
  userLanguage?: string;
  /**
   * EN: Options to show a short message in page bottom.
   * 
   * ES: Opciones para mostrar un mensaje corto en la parte inferior de la página.
   */  
  toastOptions: APP_MODELS.AppToastOptions;
  /**
   * EN: Map for control if some items are ready for init the application.
   * 
   * ES: Mapa para controlar si algunos elementos están listos para iniciar la aplicación.
   */  
  itemsReady: Map<string, boolean>;
  /**
   * EN: Options for show a message in a pop-up.
   * 
   * ES: Opciones para mostrar un mensaje en un pop-up.
   */  
  alertOptions: APP_MODELS.AppAlertOptions;
  /**
   * EN: Options for show a menu in page bottom.
   * 
   * ES: Opciones para mostrar un menú en la parte inferior de la página.
   */  
  actionSheetOptions: APP_MODELS.AppActionSheetOptions;
  /**
   * EN: Route to redirect in some application actions.
   * 
   * ES: Ruta a redirigir en algunas acciones de la aplicación.
   */  
  redirectTo: string;
}

/**
 * EN: Initial values for the application state.
 * 
 * ES: Valores iniciales para el estado de la aplicación.
 */
export const initialState: AppState = {
  toastOptions: {
    showToast: false,
    toastDuration: APP_CONSTANTS.DEFAULT_TOAST_DURATION,
    toastMessage: ''
  },
  itemsReady: new Map()
    .set(APP_CONSTANTS.APP_LANGUAGE_KEY, false)
    .set(APP_CONSTANTS.APP_PLAYERS_KEY, false)
    .set(APP_CONSTANTS.APP_SCORES_KEY, false)
    .set(APP_CONSTANTS.APP_PLAYERS_AVATARS_LIST, false),
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
  },
  actionSheetOptions: {},
  redirectTo: ''
};

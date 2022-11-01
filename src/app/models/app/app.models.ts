import { Action } from "@ngrx/store";

/**
 * EN: Interface with the options for a toast (short message in the bottom of page).
 * 
 * ES: Interfaz con las opciones para un brindis (mensaje corto en la parte inferior de la página).
 */
export interface AppToastOptions {
  /**
   * EN: Indicator if it must shown the toast.
   * 
   * ES: Indicador si se debe mostrar el brindis.
   */
  showToast: boolean;
  /**
   * EN: The message to display.
   * 
   * ES: El mensaje a mostrar.
   */  
  toastMessage: string;
  /**
   * EN: The time the message should be kept on the screen.
   * 
   * ES: El tiempo que debe mantenerse el mensaje en pantalla.
   */  
  toastDuration: number;
}

/**
 * EN: Interface with the options for the information pop-up.
 * 
 * ES: Interfaz con las opciones del pop-up de información.
 */
export interface AppAlertOptions {
  /**
   * EN: Indicator if it must display or not the pop-up.
   * 
   * ES: Indicador de si se debe mostrar o no el pop-up.
   */
  showAlert: boolean;
  /**
   * EN: Text to display in the pop-up.
   * 
   * ES: Texto para mostrar en el pop-up.
   */
  text: string;
  /**
   * EN: If it must to reset the information about the pop-up on accept or cancel it.
   * 
   * ES: Si debe restablecer la información sobre el pop-up al aceptarlo o cancelarlo.
   */
  resetOnClose?: boolean;
  /**
   * EN: Indicator if the 'Accept' button should be displayed
   * 
   * ES: Indicador si se debe mostrar el botón 'Aceptar'
   */
  showAccept?: boolean;
  /**
   * EN: Indicator if the 'Cancel' button should be displayed
   * 
   * ES: Indicador si se debe mostrar el botón 'Cancelar'
   */
  showCancel?: boolean;
  /**
   * EN: The text of the 'Accept' button
   * 
   * ES: El texto del botón 'Aceptar'
   */
  AcceptText?: string;
  /**
   * EN: The text of the 'Cancel' button
   * 
   * ES: El texto del botón 'Cancelar'
   */
  CancelText?: string;
  /**
   * EN: If it must to navigate to home on accept.
   * 
   * ES: Si es necesario para navegar al inicio al aceptar.
   */
  redirectOnAccept?: boolean;
  /**
   * EN: If it must to navigate to home on cancel.
   * 
   * ES: Si es necesario para navegar al inicio al cancelar.
   */
  redirectOnCancel?: boolean;
  /**
   * EN: Some action to dispatch on accept.
   * 
   * ES: Alguna acción para enviar al aceptar.
   */
  additionalAcceptActions?: Action[]
  /**
   * EN: Some action to dispatch on cancel.
   * 
   * ES: Alguna acción para enviar al cancelar.
   */
  additionalCancelActions?: Action[]
}

/**
 * EN: Information to create a button option in the menu displayed in the bottom of the screen.
 * 
 * ES: Información para crear una opción de botón en el menú que se muestra en la parte inferior de la pantalla.
 */
export interface AppActionSheetButton {
  /**
   * EN: Text of the button.
   * 
   * ES: Texto del botón.
   */
  text: string;
  /**
   * EN: Actions to execute on press the button.
   * 
   * ES: Acciones a ejecutar al pulsar el botón.
   */
  actions: Action[];
  /**
   * EN: Options to show or not a confirmation about the button option.
   * 
   * ES: Opciones para mostrar o no una confirmación sobre la opción del botón.
   */
  confirm?: AppActionSheetConfirm;
}

/**
 * EN: Information about the confirmation pop-up that must show for some button option of the menu of the bottom of the screen.
 * 
 * ES: Información sobre el pop-up de confirmación que debe mostrarse para alguna opción de botón del menú de la parte inferior de la pantalla.
 */
export interface AppActionSheetConfirm {
  /**
   * EN: Indicator if it must use the confirm pop-up.
   * 
   * ES: Indicador si debe usar el pop-up de confirmación.
   */
  useConfirm?: boolean;
  /**
   * EN: Text to show on the pop-up.
   * 
   * ES: Texto para mostrar en el pop-up.
   */
  confirmText?: string;
  /**
   * EN: Indicator if must redirect on confirm the pop-up.
   * 
   * ES: Indicador si debe redirigir al confirmar el pop-up.
   */
  redirectOnConfirm?: boolean;
  /**
   * EN: Indicator if must redirect on cancel the pop-up.
   * 
   * ES: Indicador si debe redirigir al cancelar el pop-up.
   */
  redirectOnCancel?: boolean;
  /**
   * EN: Text for the 'Accept' (confirm) button.
   * 
   * ES: Texto para el botón 'Aceptar' (confirmar).
   */
  acceptText?: string;
  /**
   * EN: Text for the 'Cancel' button.
   * 
   * ES: Texto para el botón 'Cancelar'.
   */
  cancelText?: string;
}

/**
 * EN: Options for the menu that is displayed in the bottom of the screen.
 * 
 * ES: Opciones para el menú que se muestra en la parte inferior de la pantalla.
 */
export interface AppActionSheetOptions {
  /**
   * EN: Indicator if it must display the menu or not.
   * 
   * ES: Indicador de si se debe mostrar el menú o no.
   */
  showActionSheet?: boolean;
  /**
   * EN: Text to show in the header of the menu.
   * 
   * ES: Texto a mostrar en la cabecera del menú.
   */
  header?: string;
  /**
   * EN: Text to display under the menu header.
   * 
   * ES: Texto a mostrar bajo la cabecera del menú.
   */
  subHeader?: string;
  /**
   * EN: List of options buttons for the menu.
   * 
   * ES: Lista de botones de opciones para el menú.
   */
  buttons?: AppActionSheetButton[];
}

/**
 * EN: Information about that how the app must behaviour when user press an option button.
 * 
 * ES: Información sobre cómo debe comportarse la aplicación cuando el usuario presiona un botón de opción.
 */
export interface AppActionSheetResponse {
  /**
   * EN: Actions to execute on press the button.
   * 
   * ES: Acciones a ejecutar al pulsar el botón.
   */
  actions?: Action[];
  /**
   * EN: If the button uses the confirm pop-up.
   * 
   * ES: Si el botón usa el pop-up de confirmación.
   */
  confirm?: AppActionSheetConfirm;
}

/**
 * EN: Interface for list the languages options in the configuration page.
 * 
 * ES: Interfaz para listar las opciones de idiomas en la página de configuración.
 */
export interface ConfigLanguageItem {
  /**
   * EN: Code of the language.
   * 
   * ES: Código de la lengua.
   */
  code: string;
  /**
   * EN: Indicator if the language is the selected or not.
   * 
   * ES: Indicador si el idioma es el seleccionado o no.
   */
  selected: boolean;
}

/**
 * EN: Interface with the information about a query of the application language.
 * 
 * ES: Interfaz con la información sobre una consulta del idioma de la aplicación.
 */
export interface StateLanguages {
  /**
   * EN: Language selected by the user.
   * 
   * ES: Idioma seleccionado por el usuario.
   */
  user: string;
  /**
   * EN: Language defined in the device.
   * 
   * ES: Idioma definido en el dispositivo.
   */
  device: string;
}

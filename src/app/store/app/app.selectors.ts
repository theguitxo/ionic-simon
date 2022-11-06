import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import * as APP_MODELS from '../../models/app/app.models';

/**
 * EN: Selector for the state of the application.
 * 
 * ES: Selector de estado de la aplicación.
 */
export const appState = createFeatureSelector<AppState>('app');

/**
 * EN: Returns the options to show a short message in the page bottom.
 * 
 * ES: Devuelve las opciones para mostrar un mensaje corto en la parte inferior de la página.
 */
export const getToastOptions = createSelector(
  appState,
  (state: AppState): APP_MODELS.AppToastOptions => state?.toastOptions
);

/**
 * EN: Returns the language of the device and the chosen by the user.
 * 
 * ES: Devuelve el idioma del dispositivo y el elegido por el usuario.
 */
export const getLanguages = createSelector(
  appState,
  (state: AppState): APP_MODELS.StateLanguages => ({
    user: state?.userLanguage,
    device: state?.deviceLanguage
  })
);

/**
 * EN: Returns the language chosen by the user.
 * 
 * ES: Devuelve el idioma elegido por el usuario.
 */
export const getUserLanguage = createSelector(
  appState,
  (state: AppState): string => state?.userLanguage
);

/**
 * EN: Returns if some required components are ready for inits the application.
 * 
 * ES: Devuelve si algunos componentes necesarios están listos para iniciar la aplicación.
 */
export const getItemsAreReady = createSelector(
  appState,
  (state: AppState): boolean => {
    const itemsState = Array.from(state?.itemsReady.values());
    return itemsState?.every(item => item);
  }
);

/**
 * EN: Returns the path to redirect.
 * 
 * ES: Devuelve la ruta a redirigir.
 */
export const getRedirectTo = createSelector(
  appState,
  (state: AppState): string => state?.redirectTo
);

/**
 * EN: Returns the options to show a message in a pop-up.
 * 
 * ES: Devuelve las opciones para mostrar un mensaje en un pop-up.
 */
export const getAlertOptions = createSelector(
  appState,
  (state: AppState): APP_MODELS.AppAlertOptions => state?.alertOptions
);

/**
 * EN: Returns the options to show an options menu in the page bottom.
 * 
 * ES: Devuelve las opciones para mostrar un menú de opciones en la parte inferior de la página.
 */
export const getActionSheetOptions = createSelector (
  appState,
  (state: AppState): APP_MODELS.AppActionSheetOptions => state?.actionSheetOptions
);

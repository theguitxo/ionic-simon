import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import * as APP_MODELS from '../../models/app/app.models';

export const appState = createFeatureSelector<AppState>('app');

export const getToastOptions = createSelector(
  appState,
  (state: AppState): APP_MODELS.AppToastOptions => state?.toastOptions
);

export const getLanguages = createSelector(
  appState,
  (state: AppState): APP_MODELS.StateLanguages => ({
    user: state?.userLanguage,
    device: state?.deviceLanguage
  })
);

export const getUserLanguage = createSelector(
  appState,
  (state: AppState): string => state?.userLanguage
);

export const getItemsAreReady = createSelector(
  appState,
  (state: AppState): boolean => {
    const itemsState = Array.from(state?.itemsReady.values());
    return itemsState?.every(item => item);
  }
);

export const getRedirectTo = createSelector(
  appState,
  (state: AppState): string => state?.redirectTo
);

export const getAlertOptions = createSelector(
  appState,
  (state: AppState): APP_MODELS.AppAlertOptions => state?.alertOptions
);

export const getActionSheetOptions = createSelector (
  appState,
  (state: AppState): APP_MODELS.AppActionSheetOptions => state?.actionSheetOptions
);

import * as APP_CONSTANTS from "../../models/app/app.constants";
import * as APP_MODELS from "../../models/app/app.models";

export interface AppState {
  deviceLanguage?: string;
  userLanguage?: string;
  toastOptions: APP_MODELS.AppToastOptions;
  itemsReady: Map<string, boolean>;
  alertOptions: APP_MODELS.AppAlertOptions,
  redirectTo: string;
}

export const initialState: AppState = {
  toastOptions: {
    showToast: false,
    toastDuration: APP_CONSTANTS.DEFAULT_TOAST_DURATION,
    toastMessage: ''
  },
  itemsReady: new Map()
    .set(APP_CONSTANTS.APP_LANGUAGE_KEY, false)
    .set(APP_CONSTANTS.APP_PLAYERS_KEY, false)
    .set(APP_CONSTANTS.APP_SCORES_KEY, false),
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
  redirectTo: ''
};

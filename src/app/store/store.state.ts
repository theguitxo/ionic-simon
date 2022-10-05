import { APP_LANGUAGE_KEY, APP_PLAYERS_KEY, APP_SCORES_KEY, DEFAULT_TOAST_DURATION } from "../models/app.constants";
import { AppAlertOptions, AppToastOptions } from "../models/app.models";

export interface StoreState {
  deviceLanguage?: string;
  userLanguage?: string;
  toastOptions: AppToastOptions;
  itemsReady: Map<string, boolean>;
  alertOptions: AppAlertOptions,
  redirectTo: string;
}

export const initialState: StoreState = {
  toastOptions: {
    showToast: false,
    toastDuration: DEFAULT_TOAST_DURATION,
    toastMessage: ''
  },
  itemsReady: new Map()
    .set(APP_LANGUAGE_KEY, false)
    .set(APP_PLAYERS_KEY, false)
    .set(APP_SCORES_KEY, false),
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

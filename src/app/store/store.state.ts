import { APP_LANGUAGE_KEY, APP_PLAYERS_KEY, DEFAULT_TOAST_DURATION } from "../models/app.constants";
import { AppToastOptions } from "../models/app.models";

export interface StoreState {
  deviceLanguage?: string;
  userLanguage?: string;
  playing: boolean;
  toastOptions: AppToastOptions;
  itemsReady: Map<string, boolean>;
  alertOptions: {
    showAlert: boolean;
    text: string;
  }
}

export const initialState: StoreState = {
  playing: false,
  toastOptions: {
    showToast: false,
    toastDuration: DEFAULT_TOAST_DURATION,
    toastMessage: ''
  },
  itemsReady: new Map().set(APP_LANGUAGE_KEY, false).set(APP_PLAYERS_KEY, false),
  alertOptions: {
    showAlert: false,
    text: ''
  }
};

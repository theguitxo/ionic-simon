import { DEFAULT_TOAST_DURATION, ToastOptions } from "../models/app.models";

export interface StoreState {
  playing: boolean;
  toastOptions: ToastOptions;
}

export const initialState: StoreState = {
  playing: false,
  toastOptions: {
    showToast: false,
    toastDuration: DEFAULT_TOAST_DURATION,
    toastMessage: ''
  }
};

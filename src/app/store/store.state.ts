import { DEFAULT_TOAST_DURATION, AppToastOptions} from "../models/app.models";

export interface StoreState {
  deviceLanguage?: string;
  userLanguage?: string;
  playing: boolean;
  toastOptions: AppToastOptions;
}

export const initialState: StoreState = {
  playing: false,
  toastOptions: {
    showToast: false,
    toastDuration: DEFAULT_TOAST_DURATION,
    toastMessage: ''
  }
};

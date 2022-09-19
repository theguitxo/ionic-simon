export interface AppToastOptions {
  showToast: boolean;
  toastMessage: string;
  toastDuration: number;
}

export interface AppAlertOptions {
  showAlert: boolean;
  text: string;
}

export type languageTypeInfo = 'device' | 'user' | 'both';

export interface ConfigLanguageItem {
  code: string;
  selected: boolean;
}

export interface StateLanguages {
  user: string;
  device: string;
}

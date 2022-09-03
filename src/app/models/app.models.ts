export interface AppToastOptions {
  showToast: boolean;
  toastMessage: string;
  toastDuration: number;
}

export type languageTypeInfo = 'device' | 'user' | 'both';

export interface ConfigLanguageItem {
  code: string;
  name: string;
  selected: boolean;
}

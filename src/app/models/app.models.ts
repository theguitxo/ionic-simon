export const DEFAULT_TOAST_DURATION = 2000;

export interface AppToastOptions {
  showToast: boolean;
  toastMessage: string;
  toastDuration: number;
}

export type languageTypeInfo = 'device' | 'user' | 'both';

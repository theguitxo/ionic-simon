import { Action } from "@ngrx/store";

export interface AppToastOptions {
  showToast: boolean;
  toastMessage: string;
  toastDuration: number;
}

export interface AppAlertOptions {
  showAlert: boolean;
  text: string;
  resetOnClose?: boolean;
  showAccept?: boolean;
  showCancel?: boolean;
  AcceptText?: string;
  CancelText?: string;
  redirectOnAccept?: boolean;
  redirectOnCancel?: boolean;
  additionalAcceptActions?: Action[]
  additionalCancelActions?: Action[]
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

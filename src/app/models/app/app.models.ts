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

export interface AppActionSheetButton {
  text: string;
  actions: Action[];
  confirm?: AppActionSheetConfirm;
}

export interface AppActionSheetConfirm {
  useConfirm?: boolean;
  confirmText?: string;
  redirectOnConfirm?: boolean;
  redirectOnCancel?: boolean;
  acceptText?: string;
  cancelText?: string;
}

export interface AppActionSheetOptions {
  showActionSheet?: boolean;
  header?: string;
  subHeader?: string;
  buttons?: AppActionSheetButton[];
}

export interface AppActionSheetResponse {
  actions?: Action[];
  confirm?: AppActionSheetConfirm;
}

export interface ConfigLanguageItem {
  code: string;
  selected: boolean;
}

export interface StateLanguages {
  user: string;
  device: string;
}

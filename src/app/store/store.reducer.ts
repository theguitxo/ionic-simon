import { Action, createReducer, on } from "@ngrx/store";
import { DEFAULT_TOAST_DURATION } from "../models/app.constants";
import { AppAlertOptions, languageTypeInfo } from "../models/app.models";
import * as ACTIONS from "./store.actions";
import { initialState, StoreState } from "./store.state";

const _storeReducer = createReducer (
  initialState,
  on(ACTIONS.showToast, (state: StoreState, { message, duration }) => ({..._showToast(state, message, duration)})),
  on(ACTIONS.resetToast, (state: StoreState) => ({..._resetToast(state)})),
  on(ACTIONS.showAlert, (state: StoreState, { options }) => ({..._showAlert(state, options)})),
  on(ACTIONS.resetAlert, (state: StoreState) => ({..._resetAlert(state)})),
  on(ACTIONS.setLanguage, (state: StoreState, { infoType, value }) => ({..._setLanguage(state, infoType, value)})),
  on(ACTIONS.initItemReady, (state: StoreState, { key }) => ({..._initItemReady(state, key)})),
  on(ACTIONS.setRedirectTo, (state: StoreState, { route }) => ({..._setRedirectTo(state, route)}))
);

export function storeReducer(state: StoreState | undefined, action: Action): StoreState {
  return _storeReducer(state, action)
}

function _showToast(state: StoreState, message: string, duration?: number): StoreState {
  return {
    ...state,
    toastOptions: {
      showToast: true,
      toastMessage: message,
      toastDuration: duration ?? DEFAULT_TOAST_DURATION
    }
  }
}

function _resetToast(state: StoreState): StoreState {
  return {
    ...state,
    toastOptions: {
      showToast: false,
      toastMessage: '',
      toastDuration: DEFAULT_TOAST_DURATION
    }
  }
}

function _showAlert(state: StoreState, options: AppAlertOptions): StoreState {
  return {
    ...state,
    alertOptions: {
      ...state.alertOptions,
      ...options
    }
  }
}

function _resetAlert(state: StoreState): StoreState {
  return {
    ...state,
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
    }
  }
}

function _setLanguage(state: StoreState, infoType: languageTypeInfo, value: string): StoreState {
  return {
    ...state,
    deviceLanguage: (infoType === 'device' || infoType === 'both') ? value : state.deviceLanguage,
    userLanguage: (infoType === 'user' || infoType === 'both') ? value : state.userLanguage
  }
}

function _initItemReady(state: StoreState, key: string): StoreState {
  return {
    ...state,
    itemsReady: state.itemsReady.set(key, true)
  }
}

function _setRedirectTo(state: StoreState, redirectTo: string): StoreState {
  return {
    ...state,
    redirectTo
  }
}

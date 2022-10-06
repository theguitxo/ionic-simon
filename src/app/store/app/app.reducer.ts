import { Action, createReducer, on } from "@ngrx/store";
import { DEFAULT_TOAST_DURATION } from "../../models/app/app.constants";
import { AppAlertOptions, languageTypeInfo } from "../../models/app/app.models";
import { initialState, AppState } from "./app.state";
import * as ACTIONS from "./app.actions";

const _appReducer = createReducer (
  initialState,
  on(ACTIONS.showToast, (state: AppState, { message, duration }) => ({..._showToast(state, message, duration)})),
  on(ACTIONS.resetToast, (state: AppState) => ({..._resetToast(state)})),
  on(ACTIONS.showAlert, (state: AppState, { options }) => ({..._showAlert(state, options)})),
  on(ACTIONS.resetAlert, (state: AppState) => ({..._resetAlert(state)})),
  on(ACTIONS.setLanguage, (state: AppState, { infoType, value }) => ({..._setLanguage(state, infoType, value)})),
  on(ACTIONS.initItemReady, (state: AppState, { key }) => ({..._initItemReady(state, key)})),
  on(ACTIONS.setRedirectTo, (state: AppState, { route }) => ({..._setRedirectTo(state, route)}))
);

export function appReducer(state: AppState | undefined, action: Action): AppState {
  return _appReducer(state, action)
}

function _showToast(state: AppState, message: string, duration?: number): AppState {
  return {
    ...state,
    toastOptions: {
      showToast: true,
      toastMessage: message,
      toastDuration: duration ?? DEFAULT_TOAST_DURATION
    }
  }
}

function _resetToast(state: AppState): AppState {
  return {
    ...state,
    toastOptions: {
      showToast: false,
      toastMessage: '',
      toastDuration: DEFAULT_TOAST_DURATION
    }
  }
}

function _showAlert(state: AppState, options: AppAlertOptions): AppState {
  return {
    ...state,
    alertOptions: {
      ...state.alertOptions,
      ...options
    }
  }
}

function _resetAlert(state: AppState): AppState {
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

function _setLanguage(state: AppState, infoType: languageTypeInfo, value: string): AppState {
  return {
    ...state,
    deviceLanguage: (infoType === 'device' || infoType === 'both') ? value : state.deviceLanguage,
    userLanguage: (infoType === 'user' || infoType === 'both') ? value : state.userLanguage
  }
}

function _initItemReady(state: AppState, key: string): AppState {
  return {
    ...state,
    itemsReady: state.itemsReady.set(key, true)
  }
}

function _setRedirectTo(state: AppState, redirectTo: string): AppState {
  return {
    ...state,
    redirectTo
  }
}

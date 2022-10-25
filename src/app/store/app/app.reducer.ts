import { Action, createReducer, on } from "@ngrx/store";
import { initialState, AppState } from "./app.state";
import * as ACTIONS from "./app.actions";
import * as APP_CONSTANTS from "../../models/app/app.constants";
import * as APP_MODELS from "../../models/app/app.models";

const _appReducer = createReducer (
  initialState,
  on(ACTIONS.showToast, (state: AppState, { message, duration }) => ({..._showToast(state, message, duration)})),
  on(ACTIONS.resetToast, (state: AppState) => ({..._resetToast(state)})),
  on(ACTIONS.showAlert, (state: AppState, { options }) => ({..._showAlert(state, options)})),
  on(ACTIONS.resetAlert, (state: AppState) => ({..._resetAlert(state)})),
  on(ACTIONS.setLanguage, (state: AppState, { infoType, value }) => ({..._setLanguage(state, infoType, value)})),
  on(ACTIONS.initItemReady, (state: AppState, { key }) => ({..._initItemReady(state, key)})),
  on(ACTIONS.setRedirectTo, (state: AppState, { route }) => ({..._setRedirectTo(state, route)})),
  on(ACTIONS.showActionSheet, (state: AppState, { options }) => ({..._showActionSheet(state, options)})),
  on(ACTIONS.resetActionSheet, (state: AppState) => ({..._resetActionSheet(state)})),
  on(ACTIONS.avatarsListOk, (state: AppState) => ({..._initItemReady(state, APP_CONSTANTS.APP_PLAYERS_AVATARS_LIST)}))
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
      toastDuration: duration ?? APP_CONSTANTS.DEFAULT_TOAST_DURATION
    }
  }
}

function _resetToast(state: AppState): AppState {
  return {
    ...state,
    toastOptions: {
      showToast: false,
      toastMessage: '',
      toastDuration: APP_CONSTANTS.DEFAULT_TOAST_DURATION
    }
  }
}

function _showAlert(state: AppState, options: APP_MODELS.AppAlertOptions): AppState {
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

function _setLanguage(state: AppState, infoType: APP_CONSTANTS.languageTypeInfo, value: string): AppState {
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

function _showActionSheet(state: AppState, options: APP_MODELS.AppActionSheetOptions): AppState {
  return {
    ...state,
    actionSheetOptions: {
      ...options,
      showActionSheet: true
    }
  }
}

function _resetActionSheet(state: AppState): AppState {
  return {
    ...state,
    actionSheetOptions: {
      showActionSheet: false,
      header: '',
      subHeader: '',
      buttons: []
    }
  }
}

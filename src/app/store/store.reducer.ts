import { Action, createReducer, on } from "@ngrx/store";
import { DEFAULT_TOAST_DURATION, languageTypeInfo } from "../models/app.models";
import * as ACTIONS from "./store.actions";
import { initialState, StoreState } from "./store.state";

const _storeReducer = createReducer (
  initialState,
  on(ACTIONS.startGame, (state: StoreState) => ({ ...state, playing: true })),
  on(ACTIONS.showToast, (state: StoreState, { message, duration }) => ({..._showToast(state, message, duration)})),
  on(ACTIONS.resetToast, (state: StoreState) => ({..._resetToast(state)})),
  on(ACTIONS.setLanguage, (state: StoreState, { infoType, value }) => ({..._setLanguage(state, infoType, value)}))
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

function _setLanguage(state: StoreState, infoType: languageTypeInfo, value: string): StoreState {
  return {
    ...state,
    deviceLanguage: (infoType === 'device' || infoType === 'both') ? value : state.deviceLanguage,
    userLanguage: (infoType === 'user' || infoType === 'both') ? value : state.userLanguage
  }
}

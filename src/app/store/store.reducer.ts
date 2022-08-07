import { Action, createReducer, on } from "@ngrx/store";
import { DEFAULT_TOAST_DURATION } from "../models/app.models";
import * as ACTIONS from "./store.actions";
import { initialState, StoreState } from "./store.state";

const _storeReducer = createReducer (
  initialState,
  on(ACTIONS.startGame, (state: StoreState) => ({ ...state, playing: true })),
  on(ACTIONS.showToast, (state: StoreState, { message, duration }) => ({..._showToast(state, message, duration)}))
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

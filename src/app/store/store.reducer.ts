import { Action, createReducer, on } from "@ngrx/store";
import * as ACTIONS from "./store.actions";
import { initialState, StoreState } from "./store.state";

const _storeReducer = createReducer (
  initialState,
  on(ACTIONS.startGame, (state: StoreState) => ({ ...state, playing: true }))
);

export function storeReducer(state: StoreState | undefined, action: Action): StoreState {
  return _storeReducer(state, action)
}

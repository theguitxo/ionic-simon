import { Action, createReducer } from "@ngrx/store";
import { initialState, StoreState } from "../store.state";

const _playersRecuder = createReducer (
  initialState,
);

export function playersReducer(state: StoreState | undefined, action: Action): StoreState {
  return _playersRecuder(state, action);
}

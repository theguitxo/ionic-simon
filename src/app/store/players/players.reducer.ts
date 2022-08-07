import { Action, createReducer } from "@ngrx/store";
import { playersInitialState, PlayersState } from "./players.state";

const _playersRecuder = createReducer (
  playersInitialState,
);

export function playersReducer(state: PlayersState | undefined, action: Action): PlayersState {
  return _playersRecuder(state, action);
}

import { Action, createReducer } from "@ngrx/store";
import { scoresInitialState, ScoreState } from "./score.state";

const _scoresReducer = createReducer (
  scoresInitialState,
);

export function scoresReducer(state: ScoreState | undefined, action: Action): ScoreState {
  return _scoresReducer(state, action);
}
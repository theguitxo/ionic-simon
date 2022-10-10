import { Action, createReducer, on } from "@ngrx/store";
import { ScoreRecord } from "src/app/models/scores/scores.models";
import { scoresInitialState, ScoreState } from "./scores.state";
import * as SCORES_ACTIONS from '../scores/scores.actions';

const _scoresReducer = createReducer (
  scoresInitialState,
  on(SCORES_ACTIONS.setScores, (state: ScoreState, { scores }) => ({ ..._setScores(state, scores)}))
);

export function scoresReducer(state: ScoreState | undefined, action: Action): ScoreState {
  return _scoresReducer(state, action);
}

export function _setScores(state: ScoreState, scores: ScoreRecord[]): ScoreState {
  return {
    ...state,
    scores
  }
}

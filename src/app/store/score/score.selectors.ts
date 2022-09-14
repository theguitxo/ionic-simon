import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ScoreState } from "./score.state";

export const scoresState = createFeatureSelector<ScoreState>('scores');

export const getHasScores = createSelector(
  scoresState,
  (state: ScoreState): boolean => state?.scores?.length > 0
);

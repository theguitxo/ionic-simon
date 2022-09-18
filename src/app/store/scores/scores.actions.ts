import { createAction, props } from "@ngrx/store";
import { ScoreRecord } from "../../models/scores.model";

export enum SCORES_ACTIONS {
  GET_SCORES_STORAGE = '[SCORES ACTIONS] Get scores storage',
  SET_SCORES = '[SCORES ACTIONS] Set scores',
  NEW_SCORE = '[SCORES ACTIONS] New score'
}

export const getScoresStorage = createAction (
  SCORES_ACTIONS.GET_SCORES_STORAGE
);

export const setScores = createAction (
  SCORES_ACTIONS.SET_SCORES,
  props<{
    scores: ScoreRecord[]
  }>()
);

export const newScore = createAction (
  SCORES_ACTIONS.NEW_SCORE,
  props<{
    score: number;
  }>()
);

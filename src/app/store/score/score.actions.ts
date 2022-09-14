import { createAction, props } from "@ngrx/store";

export enum SCORES_ACTIONS {
  NEW_SCORE = '[SCORES ACTIONS] New score'
}

export const newScore = createAction (
  SCORES_ACTIONS.NEW_SCORE,
  props<{
    id: string;
    player: string;
    date: number;
    score: number;
  }>()
);

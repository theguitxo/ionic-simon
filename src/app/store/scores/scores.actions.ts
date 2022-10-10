import { createAction, props } from "@ngrx/store";
import * as PLAYERS_MODELS from "../../models/player/player.models";
import * as SCORES_MODELS from "../../models/scores/scores.models";

export enum SCORES_ACTIONS {
  GET_SCORES_STORAGE = '[SCORES ACTIONS] Get scores storage',
  SET_SCORES = '[SCORES ACTIONS] Set scores',
  NEW_SCORE = '[SCORES ACTIONS] New score',
  REMOVE_SCORES = '[SCORES ACTIONS] Remove scores'
}

export const getScoresStorage = createAction (
  SCORES_ACTIONS.GET_SCORES_STORAGE
);

export const setScores = createAction (
  SCORES_ACTIONS.SET_SCORES,
  props<{
    scores: SCORES_MODELS.ScoreRecord[]
  }>()
);

export const newScore = createAction (
  SCORES_ACTIONS.NEW_SCORE,
  props<{
    score: number;
  }>()
);

export const removeScores = createAction (
  SCORES_ACTIONS.REMOVE_SCORES,
  props<{
    player: PLAYERS_MODELS.Player;
    removePlayer: boolean;
  }>()
);

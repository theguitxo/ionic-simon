import { ScoreRecord } from "../../models/scores/scores.models";


export interface ScoreState {
  scores: ScoreRecord[];
}

export const scoresInitialState: ScoreState = {
  scores: []
};

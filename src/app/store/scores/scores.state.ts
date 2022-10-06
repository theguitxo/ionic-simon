import { ScoreRecord } from "../../models/scores/scores.model";


export interface ScoreState {
  scores: ScoreRecord[];
}

export const scoresInitialState: ScoreState = {
  scores: []
};

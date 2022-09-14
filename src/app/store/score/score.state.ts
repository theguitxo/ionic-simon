import { ScoreRecord } from "src/app/models/player.model";

export interface ScoreState {
  scores: ScoreRecord[];
}

export const scoresInitialState: ScoreState = {
  scores: []
};

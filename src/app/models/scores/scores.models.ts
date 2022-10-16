export interface ScoreRecord {
  id: string;
  player: string;
  date: number;
  dateFormatted?: string;
  score: number;
}

export interface ScoresInfo {
  playerId: string;
  scores: ScoreRecord[];
}

export interface ScoresListItem {
  player: string;
  playerName: string;
  totalScore: number;
  scoresList: ScoreRecord[];
  onlyOneScore: boolean;
  totalScores: number;
}

export interface Player {
  id: string;
  name: string;
}

export interface ScoreRecord {
  id: string;
  players: string;
  date: number;
  score: number;
}

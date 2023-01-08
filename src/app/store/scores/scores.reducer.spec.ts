import { ScoreState, scoresInitialState } from "./scores.state";
import * as SCORE_ACTIONS from './scores.actions';
import { scoresReducer } from './scores.reducer';
import { ScoreRecord } from "../../models/scores/scores.models";

let mockScoreInitialState: ScoreState;

describe('ScoreReducer', () => {
  const ID_PLAYER_A = 'a';
  const ID_SCORE_A = 'a';
  const mockNewDate = (new Date(2023, 0, 2)).getTime();

  beforeEach(() => {
    mockScoreInitialState = scoresInitialState;
  });

  it('should return the default state', () => {
    const action = {
      type: 'Unknown',
    };
    const state = scoresReducer(mockScoreInitialState, action);

    expect(state).toBe(mockScoreInitialState);
  });

  it('should return the state after store the scores', () => {
    const scores: ScoreRecord[] = [
      {
        date: mockNewDate,
        id: ID_SCORE_A,
        player: ID_PLAYER_A,
        score: 2,
        dateFormatted: '',
      },
      {
        date: mockNewDate,
        id: ID_SCORE_A,
        player: ID_PLAYER_A,
        score: 2,
        dateFormatted: '',
      }
    ];

    const newState: ScoreState = {
      ...mockScoreInitialState,
      scores: [...scores]
    };

    const action = SCORE_ACTIONS.setScores({
      scores
    });
    const state = scoresReducer(mockScoreInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockScoreInitialState);
  });
});

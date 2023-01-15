import { ScoreState, scoresInitialState } from "./scores.state";
import * as SCORE_ACTIONS from './scores.actions';
import { scoresReducer } from './scores.reducer';
import { ScoreRecord } from "../../models/scores/scores.models";
import { ID_PLAYER_A, ID_SCORE_A, mockNewDate } from "../../../test/shared";

let mockScoreInitialState: ScoreState;

describe('ScoreReducer', () => {

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

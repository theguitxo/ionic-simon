import { ScoreRecord, ScoresInfo, ScoresListItem } from "../../models/scores/scores.models";
import { ScoreState, scoresInitialState } from "./scores.state";
import * as SCORES_SELECTORS from './scores.selectors';
import { PlayerList } from "../../models/player/player.models";
import '@angular/common/locales/global/es';

describe('ScoresSelectors', () => {
  const ID_PLAYER_A = 'a';
  const ID_PLAYER_B = 'b';
  const NAME_PLAYER_A = 'A';
  const NAME_PLAYER_B = 'B';
  const ID_SCORE_A = 'a';
  const ID_SCORE_B = 'b';
  const ID_SCORE_C = 'c';
  const ID_SCORE_D = 'd';
  const mockNewDate = (new Date(2023, 0, 2)).getTime();
  const mockInitialState: ScoreState = scoresInitialState;
  const mockScores: ScoreRecord[] = [
    {
      date: mockNewDate,
      id: ID_SCORE_A,
      player: ID_PLAYER_A,
      score: 1
    },
    {
      date: mockNewDate,
      id: ID_SCORE_B,
      player: ID_PLAYER_A,
      score: 2
    },
    {
      date: mockNewDate,
      id: ID_SCORE_C,
      player: ID_PLAYER_B,
      score: 1
    },
    {
      date: mockNewDate,
      id: ID_SCORE_D,
      player: ID_PLAYER_B,
      score: 2
    }
  ];

  const mockPlayerList: PlayerList[] = [
    {
      id: ID_PLAYER_A,
      name: NAME_PLAYER_A,
      avatar: 1,
      isCurrent: true,
      avatarPath: ''
    },
    {
      id: ID_PLAYER_B,
      name: NAME_PLAYER_B,
      avatar: 2,
      isCurrent: false,
      avatarPath: ''
    }
  ];

  it('should select the scores list', () => {
    const modifiedState: ScoreState = {
      ...mockInitialState,
      scores: [...mockScores]
    };

    const result = SCORES_SELECTORS.getScores.projector(modifiedState);

    expect(result.length).toBe(4);
  });

  it('should select if has scores', () => {
    const modifiedState: ScoreState = {
      ...mockInitialState,
      scores: [...mockScores]
    };

    const result = SCORES_SELECTORS.getHasScores.projector(modifiedState);

    expect(result).toBeTruthy();
  });

  it('should select the information to save a new score', () => {
    const expected: ScoresInfo = {
      playerId: ID_PLAYER_A,
      scores: [...mockScores]
    };
    const getCurrentPlayerId = ID_PLAYER_A;
    const scores = [...mockScores];

    const result = SCORES_SELECTORS.getNewScoreInfo.projector(
      getCurrentPlayerId,
      scores
    );

    expect(result).toEqual(expected);
  });

  it('should select if current player has scores', () => {
    const getCurrentPlayerId = ID_PLAYER_A;
    const scores = [...mockScores];

    const result = SCORES_SELECTORS.getCurrentPlayerHasScores.projector(
      scores,
      getCurrentPlayerId
    );

    expect(result).toBeTruthy();
  });

  it('should return the scores for the current player', () => {
    const expected: ScoresListItem = {
      onlyOneScore: false,
      player: ID_PLAYER_A,
      playerAvatarPath: '',
      playerName: NAME_PLAYER_A,
      scoresList: [
        {
          date: 1672614000000,
          dateFormatted: "1/1/23",
          id: ID_SCORE_A,
          player: ID_PLAYER_A,
          score: 1
        },
        {
          date: 1672614000000,
          dateFormatted: "1/1/23",
          id: ID_SCORE_B,
          player: ID_PLAYER_A,
          score: 2,
        }
      ],
      totalScore: 3,
      totalScores: 2
    };

    const scores = [...mockScores];
    const getCurrentPlayerId = ID_PLAYER_A;
    const getCurrentPlayerName = NAME_PLAYER_A;
    const getUserLanguage = 'es';
    const playerList: PlayerList[] = [...mockPlayerList];

    const result = SCORES_SELECTORS.getScoresCurrentPlayer.projector(
      scores,
      getCurrentPlayerId,
      getCurrentPlayerName,
      getUserLanguage,
      playerList
    );

    expect(result).toEqual(expected);
  });

  it('should select if other players have scores', () => {
    const getCurrentPlayerId = ID_PLAYER_A;
    const scores = [...mockScores];

    const result = SCORES_SELECTORS.getOtherPlayersHaveScores.projector(
      scores,
      getCurrentPlayerId
    );

    expect(result).toBeTruthy();
  });

  it('should return the scores for other players', () => {
    const expected: ScoresListItem[] = [{
      onlyOneScore: false,
      player: ID_PLAYER_B,
      playerAvatarPath: '',
      playerName: NAME_PLAYER_B,
      scoresList: [
        {
          date: 1672614000000,
          dateFormatted: "1/1/23",
          id: ID_SCORE_C,
          player: ID_PLAYER_B,
          score: 1
        },
        {
          date: 1672614000000,
          dateFormatted: "1/1/23",
          id: ID_SCORE_D,
          player: ID_PLAYER_B,
          score: 2,
        }
      ],
      totalScore: 3,
      totalScores: 2
    }];

    const scores = [...mockScores];
    const getCurrentPlayerId = ID_PLAYER_A;
    const getUserLanguage = 'es';
    const playerList: PlayerList[] = [...mockPlayerList];

    const result = SCORES_SELECTORS.getScoresOtherPlayers.projector(
      scores,
      playerList,
      getUserLanguage,
      getCurrentPlayerId
    );

    expect(result).toEqual(expected);
  });
});

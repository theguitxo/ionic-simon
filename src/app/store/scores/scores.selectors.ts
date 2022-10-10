import { DatePipe } from "@angular/common";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ScoreState } from "./scores.state";
import * as PLAYER_MODELS from "../../models/player/player.models";
import * as SCORES_MODELS from "../../models/scores/scores.models";
import * as PLAYERS_SELECTORS from "../players/players.selectors";
import * as APP_SELECTORS from "../app/app.selectors";

export const scoresState = createFeatureSelector<ScoreState>('scores');

export const getHasScores = createSelector(
  scoresState,
  (state: ScoreState): boolean => state?.scores?.length > 0
);

export const getScores = createSelector(
  scoresState,
  (state: ScoreState): SCORES_MODELS.ScoreRecord[] => state?.scores
);

export const getNewScoreInfo = createSelector(
  PLAYERS_SELECTORS.getCurrentPlayerId,
  getScores,
  (playerId: string, scores: SCORES_MODELS.ScoreRecord[]): SCORES_MODELS.ScoresInfo => ({
    playerId,
    scores
  })
);

export const getScoresList = createSelector (
  getScores,
  PLAYERS_SELECTORS.getPlayers,
  APP_SELECTORS.getUserLanguage,
  (scores: SCORES_MODELS.ScoreRecord[], players: PLAYER_MODELS.PlayerList[], userLanguage: string): SCORES_MODELS.ScoresListItem[] => {
    const scorePlayersIds = Array.from(new Set(scores.map(i => i.player)));
    return scorePlayersIds.map(id => 
      getScoreListItem(
        scores,
        id,
        players.find(p => p.id === id)?.name,
        userLanguage,
        5
      )
    )?.sort((a: SCORES_MODELS.ScoresListItem, b: SCORES_MODELS.ScoresListItem) => a.totalScore > b.totalScore ? -1 : 1);
  }
);

export const getScoresCurrentPlayer = createSelector (
  getScores,
  PLAYERS_SELECTORS.getCurrentPlayerId,
  PLAYERS_SELECTORS.getCurrentPlayerName,
  APP_SELECTORS.getUserLanguage,
  (scores: SCORES_MODELS.ScoreRecord[], currentPlayerId: string, currentPlayerName: string, userLanguage: string): SCORES_MODELS.ScoresListItem => {
    return {
      player: currentPlayerId,
      playerName: currentPlayerName,
      totalScore: getPlayerTotalScore(scores, currentPlayerId),
      scoresList: getPlayerLastScores(scores, currentPlayerId, userLanguage, 5)
    }
  }
);

export const getCurrentPlayerHasScores = createSelector (
  getScores,
  PLAYERS_SELECTORS.getCurrentPlayerId,
  (scores: SCORES_MODELS.ScoreRecord[], currentPlayerId: string): boolean => scores?.filter(i => i.player === currentPlayerId)?.length > 0
);

export const getOtherPlayersHaveScores = createSelector (
  getScores,
  PLAYERS_SELECTORS.getCurrentPlayerId,
  (scores: SCORES_MODELS.ScoreRecord[], currentPlayerId: string): boolean => scores?.filter(i => i.player !== currentPlayerId)?.length > 0
);

function getScoreListItem(scores: SCORES_MODELS.ScoreRecord[], playerId: string, playerName: string, userLanguage: string, scoresNumItems: number): SCORES_MODELS.ScoresListItem {
  return {
    player: playerId,
    playerName: playerName,
    scoresList: getPlayerLastScores(scores, playerId, userLanguage, scoresNumItems),
    totalScore: getPlayerTotalScore(scores, playerId)
  };
}

function getPlayerTotalScore(scores: SCORES_MODELS.ScoreRecord[], id: string): number {
  return scores.filter(i => i.player === id)?.
    map(n => n.score)?.
    reduce((previous, current) => previous + current, 0);
}

function getPlayerLastScores(scores: SCORES_MODELS.ScoreRecord[], id: string, userLanguage: string, items: number): SCORES_MODELS.ScoreRecord[] {
  return scores.filter(i => i.player === id)?.
    map(s => ({
      ...s,
      dateFormatted: (new DatePipe(userLanguage)).transform(s.date, 'shortDate', 'UTC', userLanguage)
    }))?.slice(0, items);
}

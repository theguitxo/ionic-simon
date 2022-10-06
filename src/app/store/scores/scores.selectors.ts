import { DatePipe } from "@angular/common";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ScoreState } from "./scores.state";
import * as PLAYER_MODEL from "../../models/player/player.model";
import * as SCORES_MODEL from "../../models/scores/scores.model";
import * as PLAYERS_SELECTORS from "../players/players.selectors";
import * as APP_SELECTORS from "../app/app.selectors";

export const scoresState = createFeatureSelector<ScoreState>('scores');

export const getHasScores = createSelector(
  scoresState,
  (state: ScoreState): boolean => state?.scores?.length > 0
);

export const getScores = createSelector(
  scoresState,
  (state: ScoreState): SCORES_MODEL.ScoreRecord[] => state?.scores
);

export const getNewScoreInfo = createSelector(
  PLAYERS_SELECTORS.getCurrentPlayerId,
  getScores,
  (playerId: string, scores: SCORES_MODEL.ScoreRecord[]): SCORES_MODEL.ScoresInfo => ({
    playerId,
    scores
  })
);

export const getScoresList = createSelector (
  getScores,
  PLAYERS_SELECTORS.getPlayers,
  APP_SELECTORS.getUserLanguage,
  (scores: SCORES_MODEL.ScoreRecord[], players: PLAYER_MODEL.PlayerList[], userLanguage: string): SCORES_MODEL.ScoresListItem[] => {
    const scorePlayersIds = Array.from(new Set(scores.map(i => i.player)));
    return scorePlayersIds.map(id => 
      getScoreListItem(
        scores,
        id,
        players.find(p => p.id === id)?.name,
        userLanguage,
        5
      )
    )?.sort((a: SCORES_MODEL.ScoresListItem, b: SCORES_MODEL.ScoresListItem) => a.totalScore > b.totalScore ? -1 : 1);
  }
);

export const getScoresCurrentPlayer = createSelector (
  getScores,
  PLAYERS_SELECTORS.getCurrentPlayerId,
  PLAYERS_SELECTORS.getCurrentPlayerName,
  APP_SELECTORS.getUserLanguage,
  (scores: SCORES_MODEL.ScoreRecord[], currentPlayerId: string, currentPlayerName: string, userLanguage: string): SCORES_MODEL.ScoresListItem => {
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
  (scores: SCORES_MODEL.ScoreRecord[], currentPlayerId: string): boolean => scores?.filter(i => i.player === currentPlayerId)?.length > 0
);

export const getOtherPlayersHaveScores = createSelector (
  getScores,
  PLAYERS_SELECTORS.getCurrentPlayerId,
  (scores: SCORES_MODEL.ScoreRecord[], currentPlayerId: string): boolean => scores?.filter(i => i.player !== currentPlayerId)?.length > 0
);

function getScoreListItem(scores: SCORES_MODEL.ScoreRecord[], playerId: string, playerName: string, userLanguage: string, scoresNumItems: number): SCORES_MODEL.ScoresListItem {
  return {
    player: playerId,
    playerName: playerName,
    scoresList: getPlayerLastScores(scores, playerId, userLanguage, scoresNumItems),
    totalScore: getPlayerTotalScore(scores, playerId)
  };
}

function getPlayerTotalScore(scores: SCORES_MODEL.ScoreRecord[], id: string): number {
  return scores.filter(i => i.player === id)?.
    map(n => n.score)?.
    reduce((previous, current) => previous + current, 0);
}

function getPlayerLastScores(scores: SCORES_MODEL.ScoreRecord[], id: string, userLanguage: string, items: number): SCORES_MODEL.ScoreRecord[] {
  return scores.filter(i => i.player === id)?.
    map(s => ({
      ...s,
      dateFormatted: (new DatePipe(userLanguage)).transform(s.date, 'shortDate', 'UTC', userLanguage)
    }))?.slice(0, items);
}

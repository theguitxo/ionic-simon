import { DatePipe } from "@angular/common";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ScoreState } from "./scores.state";
import * as PLAYER_MODELS from "../../models/player/player.models";
import * as SCORES_MODELS from "../../models/scores/scores.models";
import * as PLAYERS_SELECTORS from "../players/players.selectors";
import * as APP_SELECTORS from "../app/app.selectors";
import * as SCORES_CONSTANTS from '../../models/scores/scores.constants';

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
  (scores: SCORES_MODELS.ScoreRecord[], players: PLAYER_MODELS.PlayerList[], userLanguage: string): SCORES_MODELS.ScoresListItem[] => 
    getScoreListSorted(scores, players, userLanguage, 5)
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

export const getScoresCurrentPlayer = createSelector (
  getScores,
  PLAYERS_SELECTORS.getCurrentPlayerId,
  PLAYERS_SELECTORS.getCurrentPlayerName,
  APP_SELECTORS.getUserLanguage,
  (scores: SCORES_MODELS.ScoreRecord[], currentPlayerId: string, currentPlayerName: string, userLanguage: string): SCORES_MODELS.ScoresListItem =>
    getScoreListItem(scores, currentPlayerId, currentPlayerName, userLanguage, SCORES_CONSTANTS.SCORES_LIST_MAX_ITEMS)
);

export const getScoresOtherPlayers = createSelector (
  getScores,
  PLAYERS_SELECTORS.getPlayers,
  APP_SELECTORS.getUserLanguage,
  PLAYERS_SELECTORS.getCurrentPlayerId,
  (scores: SCORES_MODELS.ScoreRecord[], players: PLAYER_MODELS.PlayerList[], userLanguage: string, currentPlayerId: string): SCORES_MODELS.ScoresListItem[] =>
    getScoreListSorted(scores, players, userLanguage, SCORES_CONSTANTS.SCORES_LIST_MAX_ITEMS, currentPlayerId)
);

function getScoreListSorted(scores: SCORES_MODELS.ScoreRecord[], players: PLAYER_MODELS.PlayerList[],
  userLanguage: string, maxItems: number, currentPlayerId?: string): SCORES_MODELS.ScoresListItem[] {
  const filterIds = !!currentPlayerId;
  const scorePlayersIds = Array.from(new Set(scores.map(i => i.player)))?.filter(id => filterIds ? id !== currentPlayerId : id);
  return scorePlayersIds?.map(id => 
    getScoreListItem(scores, id, players.find(p => p.id === id)?.name, userLanguage, maxItems)
  )?.sort((a: SCORES_MODELS.ScoresListItem, b: SCORES_MODELS.ScoresListItem) => a.totalScore > b.totalScore ? -1 : 1);
}

function getScoreListItem(scores: SCORES_MODELS.ScoreRecord[], playerId: string, playerName: string, userLanguage: string, scoresNumItems: number): SCORES_MODELS.ScoresListItem {
  const scoresList = getPlayerLastScores(scores, playerId, userLanguage, scoresNumItems);
  return {
    player: playerId,
    playerName: playerName,
    scoresList,
    totalScore: getPlayerTotalScore(scores, playerId),
    onlyOneScore: scoresList?.length === 1,
    totalScores: scoresList?.length
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

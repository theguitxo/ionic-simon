import { DatePipe } from "@angular/common";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayerList } from "../../models/player.model";
import { ScoreRecord, ScoresInfo, ScoresListItem } from "../../models/scores.model";
import { getCurrentPlayerId, getCurrentPlayerName, getPlayers } from "../players/players.selectors";
import { getUserLanguage } from "../store.selectors";
import { ScoreState } from "./scores.state";

export const scoresState = createFeatureSelector<ScoreState>('scores');

export const getHasScores = createSelector(
  scoresState,
  (state: ScoreState): boolean => state?.scores?.length > 0
);

export const getScores = createSelector(
  scoresState,
  (state: ScoreState): ScoreRecord[] => state?.scores
);

export const getNewScoreInfo = createSelector(
  getCurrentPlayerId,
  getScores,
  (playerId: string, scores: ScoreRecord[]): ScoresInfo => ({
    playerId,
    scores
  })
);

export const getScoresList = createSelector (
  getScores,
  getPlayers,
  getUserLanguage,
  (scores: ScoreRecord[], players: PlayerList[], userLanguage: string): ScoresListItem[] => {
    const scorePlayersIds = Array.from(new Set(scores.map(i => i.player)));
    return scorePlayersIds.map(id => 
      getScoreListItem(
        scores,
        id,
        players.find(p => p.id === id)?.name,
        userLanguage,
        5
      )
    )?.sort((a: ScoresListItem, b: ScoresListItem) => a.totalScore > b.totalScore ? -1 : 1);
  }
);

export const getScoresCurrentPlayer = createSelector (
  getScores,
  getCurrentPlayerId,
  getCurrentPlayerName,
  getUserLanguage,
  (scores: ScoreRecord[], currentPlayerId: string, currentPlayerName: string, userLanguage: string): ScoresListItem => {
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
  getCurrentPlayerId,
  (scores: ScoreRecord[], currentPlayerId: string): boolean => scores?.filter(i => i.player === currentPlayerId)?.length > 0
);

export const getOtherPlayersHaveScores = createSelector (
  getScores,
  getCurrentPlayerId,
  (scores: ScoreRecord[], currentPlayerId: string): boolean => scores?.filter(i => i.player !== currentPlayerId)?.length > 0
);

function getScoreListItem(scores: ScoreRecord[], playerId: string, playerName: string, userLanguage: string, scoresNumItems: number): ScoresListItem {
  return {
    player: playerId,
    playerName: playerName,
    scoresList: getPlayerLastScores(scores, playerId, userLanguage, scoresNumItems),
    totalScore: getPlayerTotalScore(scores, playerId)
  };
}

function getPlayerTotalScore(scores: ScoreRecord[], id: string): number {
  return scores.filter(i => i.player === id)?.
    map(n => n.score)?.
    reduce((previous, current) => previous + current, 0);
}

function getPlayerLastScores(scores: ScoreRecord[], id: string, userLanguage: string, items: number): ScoreRecord[] {
  return scores.filter(i => i.player === id)?.
    map(s => ({
      ...s,
      dateFormatted: (new DatePipe(userLanguage)).transform(s.date, 'shortDate', 'UTC', userLanguage)
    }))?.slice(0, items);
}

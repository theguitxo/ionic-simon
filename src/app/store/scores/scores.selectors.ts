import { DatePipe } from "@angular/common";
import { INJECTOR, LOCALE_ID } from "@angular/core";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayerList } from "../../models/player.model";
import { ScoreRecord, ScoresInfo, ScoresListItem } from "../../models/scores.model";
import { getCurrentPlayerId, getPlayers } from "../players/players.selectors";
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
    return scorePlayersIds.map(id => (
      {
        player: id,
        playerName: players.find(p => p.id === id)?.name,
        totalScore: scores.filter(i => i.player === id)?.map(n => n.score)?.reduce((previous, current) => previous + current),
        scoresList: scores.filter(i => i.player === id)?.map(s => ({
          ...s,
          dateFormatted: (new DatePipe('es')).transform(s.date, 'shortDate', 'UTC', userLanguage)
        }))?.slice(0, 5)
      }
    ))?.sort((a: ScoresListItem, b: ScoresListItem) => a.totalScore > b.totalScore ? -1 : 1);
  }
)

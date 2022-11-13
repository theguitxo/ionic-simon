import { DatePipe } from "@angular/common";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ScoreState } from "./scores.state";
import * as PLAYER_MODELS from "../../models/player/player.models";
import * as SCORES_MODELS from "../../models/scores/scores.models";
import * as PLAYERS_SELECTORS from "../players/players.selectors";
import * as APP_SELECTORS from "../app/app.selectors";
import * as SCORES_CONSTANTS from '../../models/scores/scores.constants';

/**
 * EN: Selector for the state of the game scores.
 * 
 * ES: Selector para el estado de las puntuaciones del juego.
 */
export const scoresState = createFeatureSelector<ScoreState>('scores');

/**
 * EN: Returns if there are scores stored.
 * 
 * ES: Devuelve si hay puntuaciones almacenadas.
 */
export const getHasScores = createSelector(
  scoresState,
  (state: ScoreState): boolean => state?.scores?.length > 0
);

/**
 * EN: Returns the list of stored scores.
 * 
 * ES: Devuelve la lista de puntuaciones almacenadas.
 */
export const getScores = createSelector(
  scoresState,
  (state: ScoreState): SCORES_MODELS.ScoreRecord[] => state?.scores
);

/**
 * EN: Returns the list of score to use when a new game score is saved.
 * 
 * ES: Devuelve la lista de puntajes para usar cuando se guarda un nuevo puntaje de juego.
 */
export const getNewScoreInfo = createSelector(
  PLAYERS_SELECTORS.getCurrentPlayerId,
  getScores,
  (playerId: string, scores: SCORES_MODELS.ScoreRecord[]): SCORES_MODELS.ScoresInfo => ({
    playerId,
    scores
  })
);

/**
 * EN: Returns if there are scores for the current player.
 * 
 * ES: Devuelve si hay puntuaciones para el jugador actual.
 */
export const getCurrentPlayerHasScores = createSelector (
  getScores,
  PLAYERS_SELECTORS.getCurrentPlayerId,
  (scores: SCORES_MODELS.ScoreRecord[], currentPlayerId: string): boolean => scores?.filter(i => i.player === currentPlayerId)?.length > 0
);

/**
 * EN: Returns if there are scores for players that aren't the current player.
 * 
 * ES: Devuelve si hay puntuaciones de jugadores que no son el jugador actual.
 */
export const getOtherPlayersHaveScores = createSelector (
  getScores,
  PLAYERS_SELECTORS.getCurrentPlayerId,
  (scores: SCORES_MODELS.ScoreRecord[], currentPlayerId: string): boolean => scores?.filter(i => i.player !== currentPlayerId)?.length > 0
);

/**
 * EN: Returns the scores list for the current player.
 * 
 * ES: Devuelve la lista de puntuaciones del jugador actual.
 */
export const getScoresCurrentPlayer = createSelector (
  getScores,
  PLAYERS_SELECTORS.getCurrentPlayerId,
  PLAYERS_SELECTORS.getCurrentPlayerName,
  APP_SELECTORS.getUserLanguage,
  PLAYERS_SELECTORS.getPlayers, (
    scores: SCORES_MODELS.ScoreRecord[],
    currentPlayerId: string,
    currentPlayerName: string,
    userLanguage: string,
    players: PLAYER_MODELS.PlayerList[]): SCORES_MODELS.ScoresListItem =>
    getScoreListItem(players, scores, currentPlayerId, currentPlayerName, userLanguage, SCORES_CONSTANTS.SCORES_LIST_MAX_ITEMS)
);

/**
 * EN: Returns the scores list for players that aren't the current player.
 * 
 * ES: Devuelve la lista de puntuaciones de los jugadores que no son el jugador actual.
 */
export const getScoresOtherPlayers = createSelector (
  getScores,
  PLAYERS_SELECTORS.getPlayers,
  APP_SELECTORS.getUserLanguage,
  PLAYERS_SELECTORS.getCurrentPlayerId,
  (scores: SCORES_MODELS.ScoreRecord[], players: PLAYER_MODELS.PlayerList[], userLanguage: string, currentPlayerId: string): SCORES_MODELS.ScoresListItem[] =>
    getScoreListSorted(scores, players, userLanguage, SCORES_CONSTANTS.SCORES_LIST_MAX_ITEMS, currentPlayerId)
);

/**
 * EN: Returns a sorted list of games scores items.
 * 
 * ES: Devuelve una lista ordenada de elementos de puntajes de juegos.
 * @param {ScoreRecord[]} scores EN: Games scores list in the application. / ES: Lista de puntuaciones de juegos en la aplicación.
 * @param {PlayerList[]} players EN: Players list in the application. / ES: Lista de jugadores en la aplicación.
 * @param {string} userLanguage EN: Language chosen by the player. / ES: Idioma elegido por el jugador.
 * @param {number} maxItems EN: Maximum of scores item in the list. / ES: Máximo de elementos de puntuación en la lista.
 * @param {string} [currentPlayerId] EN: Identification of the current player. / ES: Identificación del jugador actual.
 * @returns {ScoresListItem[]} EN: A list of games scores items. / ES: Una lista de elementos de puntajes de juegos.
 */
function getScoreListSorted(scores: SCORES_MODELS.ScoreRecord[], players: PLAYER_MODELS.PlayerList[],
  userLanguage: string, maxItems: number, currentPlayerId?: string): SCORES_MODELS.ScoresListItem[] {
  const filterIds = !!currentPlayerId;
  const scorePlayersIds = Array.from(new Set(scores.map(i => i.player)))?.filter(id => filterIds ? id !== currentPlayerId : id);
  return scorePlayersIds?.map(id => 
    getScoreListItem(players, scores, id, players.find(p => p.id === id)?.name, userLanguage, maxItems)
  )?.sort((a: SCORES_MODELS.ScoresListItem, b: SCORES_MODELS.ScoresListItem) => a.totalScore > b.totalScore ? -1 : 1);
}

/**
 * EN: Returns an object with information about a player and their scores.
 * 
 * ES: Devuelve un objeto con información sobre un jugador y sus puntuaciones.
 * @param {PlayerList[]} players EN: Players list in the application. / ES: Lista de jugadores en la aplicación.
 * @param {ScoreRecord[]} scores EN: Games scores list in the application. / ES: Lista de puntuaciones de juegos en la aplicación.
 * @param {string} playerId EN: Player identification who to get it games scores. / ES: Identificación del jugador a quien obtener las puntuaciones de los juegos.
 * @param {string} playerName EN: Player name who to get it games scores. / ES: Nombre del jugador que para conseguirlo puntuaciones de los juegos.
 * @param {string} userLanguage EN: Language chosen by the player. / ES: Idioma elegido por el jugador.
 * @param {number} scoresNumItems EN: Number of scores to get. / ES: Número de puntuaciones a obtener.
 * @returns {ScoreListItem} EN: An object with information about a player and their scores. / ES: Un objeto con información sobre un jugador y sus puntuaciones.
 */
function getScoreListItem(
  players: PLAYER_MODELS.PlayerList[],
  scores: SCORES_MODELS.ScoreRecord[],
  playerId: string,
  playerName: string,
  userLanguage: string,
  scoresNumItems: number): SCORES_MODELS.ScoresListItem {
  const scoresList = getPlayerLastScores(scores, playerId, userLanguage, scoresNumItems);
  const playerAvatarPath = players?.find(item => item.id === playerId)?.avatarPath;
  return {
    player: playerId,
    playerName: playerName,
    scoresList,
    totalScore: getPlayerTotalScore(scores, playerId),
    onlyOneScore: scoresList?.length === 1,
    totalScores: scoresList?.length,
    playerAvatarPath
  };
}

/**
 * EN: Returns the total score for a player.
 * 
 * ES: Devuelve la puntuación total para un jugador.
 * @param {ScoreRecord[]} scores EN: Games scores list in the application. / ES: Lista de puntuaciones de juegos en la aplicación.
 * @param {string} id EN: Player identification who to get it games scores. / ES: Identificación del jugador a quien obtener las puntuaciones de los juegos.
 * @returns {number} EN: Total score for a player. / ES: Puntuación total para un jugador.
 */
function getPlayerTotalScore(scores: SCORES_MODELS.ScoreRecord[], id: string): number {
  return scores.filter(i => i.player === id)?.
    map(n => n.score)?.
    reduce((previous, current) => previous + current, 0);
}

/**
 * EN: Returns a list of games scores for a player.
 * 
 * ES: Devuelve una lista de puntuaciones de juegos para un jugador.
 * @param {ScoreRecord[]} scores EN: Games scores list in the application. / ES: Lista de puntuaciones de juegos en la aplicación.
 * @param {string} id EN: Player identification who to get it games scores. / ES: Identificación del jugador a quien obtener las puntuaciones de los juegos.
 * @param {string} userLanguage EN: Language chosen by the player. / ES: Idioma elegido por el jugador. 
 * @param {number} items EN: Number of scores to get. / ES: Número de puntuaciones a obtener.
 * @returns {ScoreRecord[]} EN: List of games scores for a player. / ES: Lista de puntuaciones de juegos para un jugador
 */
function getPlayerLastScores(scores: SCORES_MODELS.ScoreRecord[], id: string, userLanguage: string, items: number): SCORES_MODELS.ScoreRecord[] {
  return scores.filter(i => i.player === id)?.
    map(s => ({
      ...s,
      dateFormatted: (new DatePipe(userLanguage)).transform(s.date, 'shortDate', 'UTC', userLanguage)
    }))?.slice(0, items);
}

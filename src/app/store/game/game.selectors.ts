import { createFeatureSelector, createSelector } from "@ngrx/store";
import { COLOR_CODES } from "src/app/models/game.model";
import { GameState } from "./game.state";

export const gameState = createFeatureSelector<GameState>('game');

export const getGameStarted = createSelector(
  gameState,
  (state: GameState): boolean => state?.gameStarted
);

export const getButtonsEnabled = createSelector(
  gameState,
  (state: GameState): boolean => state?.buttonsEnabled
);

export const getPlayingSequence = createSelector(
  gameState,
  (state: GameState): boolean => state?.playingSequence
);

export const getGameSequence = createSelector(
  gameState,
  (state: GameState): COLOR_CODES[] => state?.gameSequence
);

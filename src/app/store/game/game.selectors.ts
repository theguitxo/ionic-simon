import { createFeatureSelector, createSelector } from "@ngrx/store";
import { COLOR_CODES, CurrentColorPlay } from "src/app/models/game/game.model";
import { GameState } from "./game.state";

export const gameState = createFeatureSelector<GameState>('game');

export const getGameStarted = createSelector(
  gameState,
  (state: GameState): boolean => state?.gameStarted
);

export const getButtonsEnabled = createSelector(
  gameState,
  (state: GameState): boolean => (
    state?.gameStarted &&
    state?.playerSequence?.length !== state?.gameSequence?.length &&
    !state?.playingSequence &&
    !state?.buttonsBlocked &&
    !state?.sequenceChecked
  )
);

export const getPlayingSequence = createSelector(
  gameState,
  (state: GameState): boolean => state?.playingSequence
);

export const getGameSequence = createSelector(
  gameState,
  (state: GameState): COLOR_CODES[] => state?.gameSequence
);

export const getGameOver = createSelector(
  gameState,
  (state: GameState): boolean => state?.gameOver
);

export const getScore = createSelector(
  gameState,
  (state: GameState): number => state?.score
);

export const getContinueGame = createSelector(
  gameState,
  (state: GameState): boolean => (state?.sequenceChecked && !state?.gameOver && !state.gamePaused)
);

export const getColorCodePlayInSequence = createSelector (
  gameState,
  (state: GameState): COLOR_CODES | null => state?.indexPlayingSequence < 0 ? null : state?.gameSequence[state?.indexPlayingSequence]
);

export const getPlayingInSequence = createSelector(
  gameState,
  getColorCodePlayInSequence,
  (state: GameState, colorCode: COLOR_CODES | null): CurrentColorPlay => {
    return {
      index: state?.indexPlayingSequence,
      colorCodePlaying: colorCode,
      soundPath: state?.colorAudios?.get(colorCode)
    }
  }
);

export const getColorCodePlayerCheck = createSelector (
  gameState,
  (state: GameState): COLOR_CODES | null => state?.playerCodeCheck
);

export const getAudioColorCodePlayerCheck = createSelector(
  gameState,
  getColorCodePlayerCheck,
  (state: GameState, colorCode: COLOR_CODES | null): string => state?.colorAudios?.get(colorCode)
);

export const getGameMessage = createSelector(
  gameState,
  (state: GameState): string => state?.gameMessage
);

export const getDisableStopGameButton = createSelector(
  gameState,
  (state: GameState): boolean => (!state?.gameStarted || state?.buttonsBlocked || state?.sequenceChecked || state?.playingSequence)
);

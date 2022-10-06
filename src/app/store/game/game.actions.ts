import { createAction, props } from "@ngrx/store";
import { COLOR_CODES } from "src/app/models/game/game.model";

export enum GAME_ACTIONS {
  INIT_GAME = '[GAME ACTIONS] Init game',
  STOP_GAME = '[GAME ACTIONS] Stop game',
  RESET_GAME_DATA = '[GAME ACTIONS] Reset game data',
  START_PLAYING_SEQUENCE = '[GAME ACTIONS] Start playing sequence',
  STOP_PLAYING_SEQUENCE = '[GAME ACTIONS] Stop playing sequence',
  NEXT_PLAYING_SEQUENCE = '[GAME ACTIONS] Next playing sequence',
  NEW_IN_SEQUENCE = '[GAME ACTIONS] New in sequence',
  START_PLAYER_ACTION = '[GAME ACTIONS] Start player action',
  CHECK_PLAYER_ACTION = '[GAME ACTIONS] Check player action'
}

export const initGame = createAction (
  GAME_ACTIONS.INIT_GAME
);

export const stopGame = createAction (
  GAME_ACTIONS.STOP_GAME
);

export const resetGameData = createAction(
  GAME_ACTIONS.RESET_GAME_DATA
);

export const startPlayingSequence = createAction (
  GAME_ACTIONS.START_PLAYING_SEQUENCE
);

export const stopPlayingSequence = createAction (
  GAME_ACTIONS.STOP_PLAYING_SEQUENCE
);

export const nextPlayingSequence = createAction (
  GAME_ACTIONS.NEXT_PLAYING_SEQUENCE
);

export const newInSequence = createAction (
  GAME_ACTIONS.NEW_IN_SEQUENCE
);

export const startPlayerAction = createAction (
  GAME_ACTIONS.START_PLAYER_ACTION,
  props<{
    colorCode: COLOR_CODES
  }>()
);

export const checkPlayerAction = createAction (
  GAME_ACTIONS.CHECK_PLAYER_ACTION
);

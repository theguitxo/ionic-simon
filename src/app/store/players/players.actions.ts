import { createAction, props } from "@ngrx/store";

export enum PLAYER_ACTIONS {
  NEW_PLAYER = '[PLAYER ACTIONS] New player'
}

/**
 * Starts the process to create a new player
 */
export const newPlayer = createAction (
  PLAYER_ACTIONS.NEW_PLAYER,
  props<{
    player: string
  }>()
)
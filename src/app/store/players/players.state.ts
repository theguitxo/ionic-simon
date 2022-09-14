import { Player } from "../../models/player.model";

export interface PlayersState {
  players: Array<Player>;
  currentPlayer: string;
}

export const playersInitialState: PlayersState = {
  players: [],
  currentPlayer: null
};

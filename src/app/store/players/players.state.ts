import { Player } from "../../models/player.model";

export interface PlayersState {
  players: Array<Player>;
  currentPlayer: Player;
}

export const playersInitialState: PlayersState = {
  players: [],
  currentPlayer: null
};

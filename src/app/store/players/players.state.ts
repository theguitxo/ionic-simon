import { OPTIONS_MENU } from "src/app/models/player.constants";
import { Player } from "../../models/player.model";

export interface PlayersState {
  players: Array<Player>;
  currentPlayer: string;
  playerMenuOptions: OPTIONS_MENU[];
  showPlayerMenu: boolean;
}

export const playersInitialState: PlayersState = {
  players: [],
  currentPlayer: null,
  playerMenuOptions: [],
  showPlayerMenu: false
};

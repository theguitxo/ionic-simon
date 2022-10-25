import { OPTIONS_MENU } from "src/app/models/player/player.constants";
import * as PLAYER_MODELS from "../../models/player/player.models";

export interface PlayersState {
  players: Array<PLAYER_MODELS.Player>;
  currentPlayer: string;
  playerMenuOptions: OPTIONS_MENU[];
  showPlayerMenu: boolean;
  avatarsList: PLAYER_MODELS.AvatarListItem[];
}

export const playersInitialState: PlayersState = {
  players: [],
  currentPlayer: null,
  playerMenuOptions: [],
  showPlayerMenu: false,
  avatarsList: []
};

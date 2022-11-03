import * as PLAYER_MODELS from "../../models/player/player.models";

export interface PlayersState {
  players: Array<PLAYER_MODELS.Player>;
  currentPlayer: string;
  showPlayerMenu: boolean;
  avatarsList: PLAYER_MODELS.AvatarListItem[];
}

export const playersInitialState: PlayersState = {
  players: [],
  currentPlayer: null,
  showPlayerMenu: false,
  avatarsList: []
};

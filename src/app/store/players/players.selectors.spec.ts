import { PlayersState, playersInitialState } from "./players.state";
import * as PLAYERS_SELECTORS from './players.selectors';
import { AvatarListItem, Player, PlayerList } from "../../models/player/player.models";
import {
  ID_AVATAR_1, ID_AVATAR_2,
  ID_PLAYER_A, ID_PLAYER_B,
  MOCK_AVATAR_LIST, MOCK_PLAYERS_LIST,
  NAME_PLAYER_A, NAME_PLAYER_B,
  PATH_AVATAR_1, PATH_AVATAR_2
} from "../../../test/shared";

describe('PlayersSelectors', () => {
  const mockInitialState: PlayersState = playersInitialState;



  it('should select the list of avatars', () => {
    const modifiedState: PlayersState = {
      ...mockInitialState,
      avatarsList: [...MOCK_AVATAR_LIST]
    };

    const result = PLAYERS_SELECTORS.getAvatarsList.projector(modifiedState);

    expect(result.length).toBe(2);
  });

  it('should select if avatars list is ready', () => {
    const getAvatarsList: AvatarListItem[] = [...MOCK_AVATAR_LIST];
    const result = PLAYERS_SELECTORS.getAvatarsListReady.projector(getAvatarsList);

    expect(result).toBeTruthy();
  });

  it('should select if has current player', () => {
    const result = PLAYERS_SELECTORS.getHasCurrentPlayer.projector(mockInitialState);

    expect(result).toBeFalsy();
  });

  it('should select the current player info', () => {
    const modifiedState: PlayersState = {
      ...mockInitialState,
      players: [...MOCK_PLAYERS_LIST],
      currentPlayer: ID_PLAYER_A
    }
    const result = PLAYERS_SELECTORS.getCurrentPlayer.projector(modifiedState);

    expect(result).toEqual(MOCK_PLAYERS_LIST[0]);
  });

  it('should select the current player name', () => {
    const mockCurrentPlayer: Player = {
      ...MOCK_PLAYERS_LIST[0]
    } 

    const result = PLAYERS_SELECTORS.getCurrentPlayerName.projector(mockCurrentPlayer);

    expect(result).toBe(NAME_PLAYER_A);
  });

  it('should select the current player id', () => {
    const mockCurrentPlayer: Player = {
      ...MOCK_PLAYERS_LIST[0]
    } 

    const result = PLAYERS_SELECTORS.getCurrentPlayerId.projector(mockCurrentPlayer);

    expect(result).toBe(ID_PLAYER_A);
  });

  it('should select the avatar path for the current player', () => {
    const modifiedState: PlayersState = {
      ...mockInitialState,
      players: [...MOCK_PLAYERS_LIST],
      avatarsList: [...MOCK_AVATAR_LIST]
    };
    const mockCurrentPlayer: Player = {
      ...MOCK_PLAYERS_LIST[0]
    };

    const result = PLAYERS_SELECTORS.getCurrentPlayerAvatar.projector(modifiedState, mockCurrentPlayer);

    expect(result).toBe(PATH_AVATAR_1);
  });

  it('should select if has players', () => {
    const modifiedState: PlayersState = {
      ...mockInitialState,
      players: [...MOCK_PLAYERS_LIST]
    };

    const result = PLAYERS_SELECTORS.getHasPlayers.projector(modifiedState);

    expect(result).toBeTruthy();
  });

  it('should select the list of players names', () => {
    const modifiedState: PlayersState = {
      ...mockInitialState,
      players: [...MOCK_PLAYERS_LIST]
    };

    const result = PLAYERS_SELECTORS.getPlayersNames.projector(modifiedState);

    expect(result).toEqual([
      NAME_PLAYER_A, NAME_PLAYER_B
    ]);
  });

  it('should select the list of players', () => {
    const expected: PlayerList[] = [
      {
        avatar: ID_AVATAR_1,
        avatarPath: PATH_AVATAR_1,
        id: ID_PLAYER_A,
        isCurrent: true,
        name: NAME_PLAYER_A
      },
      {
        avatar: ID_AVATAR_2,
        avatarPath: PATH_AVATAR_2,
        id: ID_PLAYER_B,
        isCurrent: false,
        name: NAME_PLAYER_B
      }
    ]
    const modifiedState: PlayersState = {
      ...mockInitialState,
      players: [...MOCK_PLAYERS_LIST],
      avatarsList: [...MOCK_AVATAR_LIST],
      currentPlayer: ID_PLAYER_A
    };

    const result = PLAYERS_SELECTORS.getPlayers.projector(modifiedState);

    expect(result).toEqual(expected);
  });
});

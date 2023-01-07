import { PlayersState, playersInitialState } from "./players.state";
import * as PLAYERS_SELECTORS from './players.selectors';
import { AvatarListItem, Player, PlayerList } from "../../models/player/player.models";

describe('PlayersSelectors', () => {
  const mockInitialState: PlayersState = playersInitialState;

  const ID_AVATAR_1 = 1;
  const PATH_AVATAR_1 = 'path avatar 1';
  const ID_AVATAR_2 = 2;
  const PATH_AVATAR_2 = 'path avatar 1';
  const ID_PLAYER_A = 'a';
  const NAME_PLAYER_A = 'A';
  const ID_PLAYER_B = 'b';
  const NAME_PLAYER_B = 'B';
  const MOCK_AVATAR_LIST: AvatarListItem[] = [
    {
      id: ID_AVATAR_1,
      path: PATH_AVATAR_1
    },
    {
      id: ID_AVATAR_2,
      path: PATH_AVATAR_2
    }
  ];
  const MOCK_PLAYERS_LIST: Player[] = [
    {
      id: ID_PLAYER_A,
      avatar: ID_AVATAR_1,
      name: NAME_PLAYER_A
    },
    {
      id: ID_PLAYER_B,
      avatar: ID_AVATAR_2,
      name: NAME_PLAYER_B
    }
  ]

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

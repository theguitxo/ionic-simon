import { PlayersState, playersInitialState } from "./players.state";
import { playersReducer } from './players.reducer';
import * as PLAYER_ACTIONS from './players.actions';
import { AvatarListItem, Player } from "../../models/player/player.models";

let mockPlayersInitialState: PlayersState;

describe('PlayersReducer', () => {
  beforeEach(() => {
    mockPlayersInitialState = playersInitialState;
  });

  it('should return the default state', () => {
    const action = {
      type: 'Unknown',
    };
    const state = playersReducer(mockPlayersInitialState, action);

    expect(state).toBe(mockPlayersInitialState);
  });

  it('should return state after create avatars list', () => {
    const avatarsList: AvatarListItem[] = new Array(16).fill('').map((_i, index) => {
      const fileNumber = `0${index + 1}`.slice(-2);
      return {
        id: index + 1,
        path: `/assets/avatar/avatar_${fileNumber}.svg`
      }
    });

    const newState: PlayersState = {
      ...mockPlayersInitialState,
      avatarsList
    };

    const action = PLAYER_ACTIONS.createAvatarsList();
    const state = playersReducer(mockPlayersInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockPlayersInitialState);
  });

  it('should return state after set the players list', () => {
    const players: Player[] = [
      {
        id: 'a',
        avatar: 1,
        name: 'A'
      },
      {
        id: 'b',
        avatar: 2,
        name: 'B'
      }
    ];

    const newState: PlayersState = {
      ...mockPlayersInitialState,
      players
    };

    const action = PLAYER_ACTIONS.setPlayersList({
      players
    });
    const state = playersReducer(mockPlayersInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockPlayersInitialState);
  });

  
  it('should return state after set the current player', () => {
    const newState: PlayersState = {
      ...mockPlayersInitialState,
      currentPlayer: 'a'
    };

    const action = PLAYER_ACTIONS.setCurrentPlayer({
      currentPlayer: 'a'
    })
    const state = playersReducer(mockPlayersInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockPlayersInitialState);
  });
});

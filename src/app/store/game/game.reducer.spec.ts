import { initGame, newInSequence, nextPlayingSequence, pauseGame, resetGameData, resumeGame, startPlayerAction, startPlayingSequence, stopGame, stopPlayingSequence } from './game.actions';
import { gameReducer } from './game.reducers';
import { GameState, gameInitialState } from "./game.state";
import { COLOR_CODES } from "../../models/game/game.model";
 
const colorCodes = Object.values(COLOR_CODES)?.filter(value => parseInt(<string>value));

let mockGameInitialState: GameState;

fdescribe('GameReducer', () => {
  beforeEach(() => {
    mockGameInitialState = gameInitialState;
  });

  it('should return the default state', () => {
    const action = {
      type: 'Unknown',
    };
    const state = gameReducer(mockGameInitialState, action);

    expect(state).toBe(mockGameInitialState);
  });

  it('should return the state on init game', () => {
    const newState: GameState = {
      ...mockGameInitialState,
      gameStarted: true,
      colorCodePlaying: null
    };
    const action = initGame();
    const state = gameReducer(mockGameInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockGameInitialState);
  });

  it('should return the state on stop game', () => {
    const newState: GameState = {
      ...mockGameInitialState,
      gameStarted: false,
      colorCodePlaying: null,
      indexPlayingSequence: -1
    };
    const initState: GameState = {
      ...mockGameInitialState,
      gameStarted: true,
      colorCodePlaying: null
    };
    const action = stopGame();
    const state = gameReducer(initState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(initState);
  });

  it('should return the state on stop game', () => {
    const newState: GameState = {
      ...mockGameInitialState,
      gameSequence: [],
      playerSequence: [],
      playingSequence: false,
      gameOver: false,
      score: 0,
      buttonsBlocked: false,
      sequenceChecked: false
    };
    const initState: GameState = {
      ...mockGameInitialState,
      score: 5,
      gameOver: true
    };
    const action = resetGameData();
    const state = gameReducer(initState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(initState);
  });

  it('should return the state on add a new item in sequence', () => {
    Object.defineProperty(globalThis, 'crypto', {
      value: {
        getRandomValues: (buffer) => { buffer[0] = 9 }
      }
    });

    const newState: GameState = {
      ...mockGameInitialState,
      gameSequence: [4]
    };

    const action = newInSequence();
    const state = gameReducer(mockGameInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockGameInitialState);
  });

  it('should return the state on start playing sequence', () => {
    const newState: GameState = {
      ...mockGameInitialState,
      playingSequence: true,
      gameMessage: 'player.messages.playingSequence',
      sequenceChecked: false,
      indexPlayingSequence: 0
    };
    const action = startPlayingSequence();
    const state = gameReducer(mockGameInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockGameInitialState);
  });

  it('should return the state on stop playing sequence', () => {
    const newState: GameState = {
      ...mockGameInitialState,
      playingSequence: false,
      indexPlayingSequence: 0,
      gameMessage: '',
      sequenceChecked: false
    };
    const initState: GameState = {
      ...mockGameInitialState,
      playingSequence: true,
      indexPlayingSequence: 3,
      sequenceChecked: true
    };
    const action = stopPlayingSequence();
    const state = gameReducer(initState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(initState);
  });

  it('should return the state on next in playing sequence', () => {
    const newState: GameState = {
      ...mockGameInitialState,
      gameSequence: [1, 4, 3, 2, 2, 1],
      indexPlayingSequence: 3,
      playingSequence: true,
      gameMessage: 'player.messages.repeatSequence'
    };
    const initState: GameState = {
      ...mockGameInitialState,
      indexPlayingSequence: 2,
      gameSequence: [1, 4, 3, 2, 2, 1]
    };
    const action = nextPlayingSequence();
    const state = gameReducer(initState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(initState);
  });

  it('should return the state on start player action', () => {
    const newState: GameState = {
      ...mockGameInitialState,
      buttonsBlocked: true,
      sequenceChecked: false,
      playerCodeCheck: 1
    };

    const action = startPlayerAction({
      colorCode: 1
    });
    const state = gameReducer(mockGameInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockGameInitialState);
  });


  it('should return the state on pause game', () => {
    const newState: GameState = {
      ...mockGameInitialState,
      gamePaused: true
    };

    const action = pauseGame();
    const state = gameReducer(mockGameInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockGameInitialState);
  });

  it('should return the state on resume game', () => {
    const newState: GameState = {
      ...mockGameInitialState,
      gamePaused: false
    };
    const initState: GameState = {
      ...mockGameInitialState,
      gamePaused: true
    };

    const action = resumeGame();
    const state = gameReducer(initState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(initState);
  });
});

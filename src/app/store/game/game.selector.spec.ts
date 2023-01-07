import * as GAME_SELECTORS from "./game.selectors";
import { GameState, gameInitialState } from "./game.state";

describe('GameSelectors', () => {
  const mockInitialState: GameState = gameInitialState;

  it('should select game is started', () => {
    const result = GAME_SELECTORS.getGameStarted.projector(mockInitialState);

    expect(result).toBeFalsy();
  });

  it('should select buttons are disabled', () => {
    const result = GAME_SELECTORS.getButtonsEnabled.projector(mockInitialState);

    expect(result).toBeFalsy();
  });

  it('should select buttons are enabled', () => {
    const modifiedState: GameState = {
      ...mockInitialState,
      gameStarted: true,
      playerSequence: [1, 2, 3],
      gameSequence: [1, 2, 3, 4],
      playingSequence: false,
      buttonsBlocked: false,
      sequenceChecked: false
    }
    const result = GAME_SELECTORS.getButtonsEnabled.projector(modifiedState);

    expect(result).toBeTruthy();
  });

  it('should select is playing sequence', () => {
    const result = GAME_SELECTORS.getPlayingSequence.projector(mockInitialState);

    expect(result).toBeFalsy();
  });

  it('should select the game sequence', () => {
    const modifiedState: GameState = {
      ...mockInitialState,
      gameSequence: [1, 2, 3, 4]
    };

    const result = GAME_SELECTORS.getGameSequence.projector(modifiedState);

    expect(result.length).toBe(4);
  });

  it('should select if game is over', () => {
    const result = GAME_SELECTORS.getGameOver.projector(mockInitialState);

    expect(result).toBeFalsy();
  });

  it('should select the game score', () => {
    const modifiedState: GameState = {
      ...mockInitialState,
      score: 5
    };

    const result = GAME_SELECTORS.getScore.projector(modifiedState);

    expect(result).toBe(5);
  });

  it('should select can continue game', () => {
    const modifiedState: GameState = {
      ...mockInitialState,
      sequenceChecked: true,
      gameOver: false,
      gamePaused: false
    };

    const result = GAME_SELECTORS.getContinueGame.projector(modifiedState);

    expect(result).toBeTruthy();
  });

  it('should select null when there not are index for playing sequence', () => {
    const result = GAME_SELECTORS.getColorCodePlayInSequence.projector(mockInitialState);

    expect(result).toBeNull();
  });

  it('should select the color code in sequence according playing index', () => {
    const modifiedState: GameState = {
      ...mockInitialState,
      gameSequence: [2, 3, 1, 4],
      indexPlayingSequence: 1
    };

    const result = GAME_SELECTORS.getColorCodePlayInSequence.projector(modifiedState);

    expect(result).toBe(3);
  });

  it('should select null when there not are index for get the information about the color to play', () => {
    const expected = {
      colorCodePlaying: undefined,
      index: -1,
      soundPath: undefined
    };
    const result = GAME_SELECTORS.getPlayingInSequence.projector(mockInitialState);

    expect(result).toEqual(expected);
  });

  it('should select the information about the color to play when there are a value for the index', () => {
    const modifiedState: GameState = {
      ...mockInitialState,
      gameSequence: [2, 3, 1, 4],
      indexPlayingSequence: 1
    };
    const expected = {
      colorCodePlaying: 3,
      index: 1,
      soundPath: './assets/audios/yellow.wav'
    };
    const getColorCodePlayInSequence = 3;
    const result = GAME_SELECTORS.getPlayingInSequence.projector(modifiedState, getColorCodePlayInSequence);

    expect(result).toEqual(expected);
  });

  it('should select the color code to check (null on start app)', () => {
    const result = GAME_SELECTORS.getColorCodePlayerCheck.projector(mockInitialState);

    expect(result).toBeNull();
  });

  it('should select the color code to check', () => {
    const modifiedState: GameState = {
      ...mockInitialState,
      playerCodeCheck: 2
    };

    const result = GAME_SELECTORS.getColorCodePlayerCheck.projector(modifiedState);

    expect(result).toBe(2);
  });

  it('should select the audio for the color code to check (null on start app)', () => {
    const getColorCodePlayerCheck = null;
    const result = GAME_SELECTORS.getAudioColorCodePlayerCheck.projector(mockInitialState, getColorCodePlayerCheck);

    expect(result).toBeUndefined();
  });

  it('should select the audio for the color code to check', () => {
    const getColorCodePlayerCheck = 2;
    const result = GAME_SELECTORS.getAudioColorCodePlayerCheck.projector(mockInitialState, getColorCodePlayerCheck);

    expect(result).toBe('./assets/audios/red.wav');
  });

  it('sould select the game message', () => {
    const modifiedState: GameState = {
      ...mockInitialState,
      gameMessage: 'message'
    };

    const result = GAME_SELECTORS.getGameMessage.projector(modifiedState);

    expect(result).toBe('message');
  });

  it('should select when the stop game button is disabled', () => {
    const modifiedState: GameState = {
      ...mockInitialState,
      gameStarted: false,
      buttonsBlocked: true,
      sequenceChecked: true,
      playingSequence: true
    };

    const result = GAME_SELECTORS.getDisableStopGameButton.projector(modifiedState);

    expect(result).toBeTruthy();
  });

  it('should select when the stop game button is not disabled', () => {
    const modifiedState: GameState = {
      ...mockInitialState,
      gameStarted: true,
      buttonsBlocked: false,
      sequenceChecked: false,
      playingSequence: false
    };

    const result = GAME_SELECTORS.getDisableStopGameButton.projector(modifiedState);

    expect(result).toBeFalsy();
  });
});

export enum COLOR_CODES {
  BLUE = 1,
  RED = 2,
  YELLOW = 3,
  GREEN = 4
}

export interface CurrentColorPlay {
  index: number;
  colorCodePlaying: COLOR_CODES;
  soundPath: null | string;
}

import { Pipe, PipeTransform } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { APP_CURRENT_PLAYER_KEY, APP_LANGUAGE_KEY, APP_PLAYERS_KEY, APP_SCORES_KEY } from "../app/models/app/app.constants";
import { AvatarListItem, Player } from "../app/models/player/player.models";
import { ScoreRecord } from "../app/models/scores/scores.models";
import { COLOR_CODES, CurrentColorPlay } from "../app/models/game/game.model";

// Mocked data
export const mockNewDate = (new Date(2023, 0, 2)).getTime();

export const MOCK_COLOR_CODE = COLOR_CODES.BLUE;

export const ID_AVATAR_1 = 1;
export const PATH_AVATAR_1 = 'path avatar 1';
export const ID_AVATAR_2 = 2;
export const PATH_AVATAR_2 = 'path avatar 1';
export const ID_PLAYER_A = 'a';
export const NAME_PLAYER_A = 'A';
export const ID_PLAYER_B = 'b';
export const NAME_PLAYER_B = 'B';

export const ID_SCORE_A = 'a';
export const ID_SCORE_B = 'b';
export const ID_SCORE_C = 'c';
export const ID_SCORE_D = 'd';

export const MOCK_AVATAR_LIST: AvatarListItem[] = [
  {
    id: ID_AVATAR_1,
    path: PATH_AVATAR_1
  },
  {
    id: ID_AVATAR_2,
    path: PATH_AVATAR_2
  }
];

export const MOCK_PLAYERS_LIST: Player[] = [
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
];

export const mockPlayerA: Player = {
  id: ID_PLAYER_A,
  name: 'A',
  avatar: 1
};

export const mockPlayerB: Player = {
  id: 'b',
  name: 'B',
  avatar: 2
};

export const mockPlayerC: Player = {
  id: 'c',
  name: 'C',
  avatar: 3
};

export const mockCurrentPlayer = 'a';

export const mockPlayersList: Player[] = [ mockPlayerA, mockPlayerB ];

export const mockStorageLanguage: string = 'es';

export const mockScores: ScoreRecord[] = [
  {
    date: mockNewDate,
    id: ID_SCORE_A,
    player: ID_PLAYER_A,
    score: 1
  },
  {
    date: mockNewDate,
    id: ID_SCORE_B,
    player: ID_PLAYER_B,
    score: 1
  }
];

export const mockSoundPath = 'sound_path';

export const mockCurrentColorPlay: CurrentColorPlay = {
  colorCodePlaying: COLOR_CODES.BLUE,
  index: 1,
  soundPath: mockSoundPath
};

// Mocked classes
export class TranslateServiceStub{
	public get(key: any): any {
		return of(key);
	}

  public instant(key: any): any {
		return of(key);
	}
  
  setDefaultLang(_lang): void {}

  use(_lang): void {}
}

export class StorageServiceMock {
  data: any = {};

  constructor() {
    this.data[APP_PLAYERS_KEY] = [...mockPlayersList];
    this.data[APP_CURRENT_PLAYER_KEY]= mockCurrentPlayer;
    this.data[APP_LANGUAGE_KEY] = mockStorageLanguage;
    this.data[APP_SCORES_KEY] = mockScores;
  }

  storageReady$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  get(key): Promise<any> {
    return Promise.resolve(this.data[key]);
  }

  set(key: string, value: any): Promise<any> {
    this.data[key] = value;
    return Promise.resolve(null);
  }
}

export class StorageServiceRejectMock {
  data: any = {};

  constructor() {
    this.data[APP_PLAYERS_KEY] = [...mockPlayersList];
    this.data[APP_CURRENT_PLAYER_KEY]= mockCurrentPlayer;
  }

  get(_key): Promise<any> {
    return Promise.reject()
  }

  set(key: string, value: any): Promise<any> {
    this.data[key] = value;
    return Promise.reject();
  }
}

@Pipe({
  name: "translate"
})
export class MockTranslatePipe implements PipeTransform {
  public name: string = "translate";

  public transform(query: string, ..._args: any[]): any {
      return query;
  }
}

@Pipe({
  name: 'date',
  pure: false
})
export class MockDatePipe implements PipeTransform {
  public name: string = 'date';

  public transform(_value: any, ..._args: any[]) {
    return '';
  }
}

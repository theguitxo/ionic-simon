import { Pipe, PipeTransform } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { APP_CURRENT_PLAYER_KEY, APP_LANGUAGE_KEY, APP_PLAYERS_KEY } from "../app/models/app/app.constants";
import { Player } from "../app/models/player/player.models";

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

// Mock Storage Service
export const mockPlayerA: Player = {
  id: 'a',
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

export class StorageServiceMock {
  data: any = {};

  constructor() {
    this.data[APP_PLAYERS_KEY] = [...mockPlayersList];
    this.data[APP_CURRENT_PLAYER_KEY]= mockCurrentPlayer;
    this.data[APP_LANGUAGE_KEY] = mockStorageLanguage;
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

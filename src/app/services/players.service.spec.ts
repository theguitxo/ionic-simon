import { TestBed } from '@angular/core/testing';
import { PlayersService } from './players.service';
import { StorageService } from './storage.service';
import {
  StorageServiceMock, StorageServiceRejectMock,
  mockCurrentPlayer, mockPlayerC, mockPlayersList
} from '../../test/shared';

describe('PlayersService', () => {
  let service: PlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useClass: StorageServiceMock
        }
      ]
    });
    service = TestBed.inject(PlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return value for players from storage', (done) => {
    service.getPlayersFromStorage()
      .then((result) => {
        expect(result).toEqual(mockPlayersList);
        done();
      });
  });

  it('should return value for current player from storage', (done) => {
    service.getCurrentPlayerFromStorage()
      .then((result) => {
        expect(result).toBe(mockCurrentPlayer);
        done();
      });
  });

  it('should set the players list on storage', (done) => {
    const storageSetSpy = spyOn(service['storageService'], 'set').and.callThrough();

    service.setPlayersInStorage([mockPlayerC])
      .then(() => {
        expect(storageSetSpy).toHaveBeenCalled();
        done();
      });
  });

  it('should set the current player on storage', (done) => {
    const storageSetSpy = spyOn(service['storageService'], 'set').and.callThrough();

    service.setCurrentPlayerInStorage(mockCurrentPlayer)
      .then(() => {
        expect(storageSetSpy).toHaveBeenCalled();
        done();
      });
  });
});

describe('PlayersServiceRejectPromises', () => {
  let service: PlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useClass: StorageServiceRejectMock
        }
      ]
    });
    service = TestBed.inject(PlayersService);
  });

  it('should return empty array on reject promise to get the players list', (done) => {
    service.getPlayersFromStorage()
      .then((result) => {
        expect(result.length).toBe(0);
        done();
      });
  });

  it('should return null on reject promise to get the current player', (done) => {
    service.getCurrentPlayerFromStorage()
      .then((result) => {
        expect(result).toBeNull();
        done();
      });
  });
});

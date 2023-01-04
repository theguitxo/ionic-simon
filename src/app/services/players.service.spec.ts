import { TestBed } from '@angular/core/testing';

import { PlayersService } from './players.service';
import { StorageService } from './storage.service';

const StorageServiceMock = {};

describe('PlayersService', () => {
  let service: PlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useValue: StorageServiceMock
        }
      ]
    });
    service = TestBed.inject(PlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

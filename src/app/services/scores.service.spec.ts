import { TestBed } from "@angular/core/testing";
import { ScoresService } from "./scores.service";
import { StorageService } from "./storage.service";
import {
  StorageServiceMock,
  StorageServiceRejectMock,
  mockScores
} from "../../test/shared";

describe('ScoresService', () => {
  let service: ScoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useClass: StorageServiceMock
        }
      ]
    });
    service = TestBed.inject(ScoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return value for scores from storage', (done) => {
    service.getScoresFromStorage()
      .then((result) => {
        expect(result).toEqual(mockScores);
        done();
      });
  });

  it('should set the scores list on storage', (done) => {
    const storageSetSpy = spyOn(service['storageService'], 'set').and.callThrough();

    service.setNewScore([...mockScores])
      .then(() => {
        expect(storageSetSpy).toHaveBeenCalled();
        done();
      });
  });
});

describe('ScoresServiceRejectPromises', () => {
  let service: ScoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useClass: StorageServiceRejectMock
        }
      ]
    });
    service = TestBed.inject(ScoresService);
  });

  it('should return empty array on reject promise to get the scores list', (done) => {
    service.getScoresFromStorage()
      .then((result) => {
        expect(result.length).toBe(0);
        done();
      });
    });
  });

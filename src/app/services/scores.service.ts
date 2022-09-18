import { Injectable } from "@angular/core";
import { APP_SCORES_KEY } from "../models/app.constants";
import { ScoreRecord } from "../models/scores.model";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  constructor(
    private readonly storageService: StorageService
  ) {}

  getScoresFromStorage(): Promise<ScoreRecord[]> {
    return new Promise((resolve) => {
      this.storageService.get(APP_SCORES_KEY)
        .then((value) => {
          resolve(value || []);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  setNewScore(scores: ScoreRecord[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storageService.set(APP_SCORES_KEY, scores)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }
}

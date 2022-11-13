import { Injectable } from "@angular/core";
import { APP_SCORES_KEY } from "../models/app/app.constants";
import { ScoreRecord } from "../models/scores/scores.models";
import { StorageService } from "./storage.service";

/**
 * EN: Service to manage the games scores information in the local storage.
 * 
 * ES: Servicio para gestionar la información de las puntuaciones de los juegos en el almacenamiento local.
 */
@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  /**
   * EN: Constructor for the service.
   * 
   * ES: Constructor para el servicio.
   * @param {StorageService} storageService EN: Service to manage the local storage. / ES: Servicio para gestionar el almacenamiento local. 
   */
  constructor(
    private readonly storageService: StorageService
  ) {}

  /**
   * EN: Gets the games scores from the local storage.
   * 
   * ES: Obtiene las puntuaciones de los juegos del almacenamiento local.
   * @returns {Promise<StoreRecord[]>} EN: List of games scores. / ES: Lista de puntajes de juegos.
   */
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

  /**
   * EN: Saves the scores into the local storage.
   * 
   * ES: Guarda las puntuaciones en el almacenamiento local.
   * @param {StoreRecord[]} scores EN: List of games scores. / ES: Lista de puntajes de juegos.
   * @returns {Promise<void>}
   */
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

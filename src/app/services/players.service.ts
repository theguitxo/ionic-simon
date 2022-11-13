import { Injectable } from '@angular/core';
import { APP_CURRENT_PLAYER_KEY, APP_PLAYERS_KEY } from '../models/app/app.constants';
import { Player } from '../models/player/player.models';
import { StorageService } from './storage.service';

/**
 * EN: Service to manage the players information in the local storage.
 * 
 * ES: Servicio para gestionar la información de los jugadores en el almacenamiento local.
 */
@Injectable({
  providedIn: 'root'
})
export class PlayersService {

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
   * EN: Gets the players list from the local storage.
   * 
   * ES: Obtiene la lista de jugadores del almacenamiento local.
   * @returns {Promise<Player[]>} EN: List of players. / ES: Lista de jugadores.
   */
  getPlayersFromStorage(): Promise<Player[]> {
    return new Promise((resolve) => {
      this.storageService.get(APP_PLAYERS_KEY)
        .then((value) => {
          resolve(value || []);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }
  
  /**
   * EN: Gets the current player code from the local storage.
   * 
   * ES: Obtiene el código de jugador actual del almacenamiento local.
   * @returns {Promise<string>} EN: Identification of the player. / ES: Identificación del jugador.
   */
  getCurrentPlayerFromStorage(): Promise<string> {
    return new Promise((resolve) => {
      this.storageService.get(APP_CURRENT_PLAYER_KEY)
        .then((value) => {
          resolve(value || null);
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  /**
   * EN: Saves the players list in the local storage.
   * 
   * ES: Guarda la lista de jugadores en el almacenamiento local.
   * @param {Player[]} players EN: List of players. / ES: Lista de jugadores.
   * @returns {Promise<void>}
   */
  setPlayersInStorage(players: Player[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storageService.set(APP_PLAYERS_KEY, players)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }

  /**
   * EN: Saves the identification of the current player into the local storage.
   * 
   * ES: Guarda la identificación del jugador actual en el almacenamiento local.
   * @param {string} player EN: Identification of the current player. / ES: Identificación del jugador actual.
   * @returns {Promise<void>}
   */
  setCurrentPlayerInStorage(player: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storageService.set(APP_CURRENT_PLAYER_KEY, player)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }
}

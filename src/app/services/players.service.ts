import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { APP_CURRENT_PLAYER_KEY, APP_PLAYERS_KEY } from '../models/app.constants';
import { Player } from '../models/player.model';
import { StoreState } from '../store/store.state';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private readonly storageService: StorageService,
    private readonly store: Store<StoreState>
  ) {}

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

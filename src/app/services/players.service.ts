import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private storage: Storage
  ) {}

  getAllPlayers() {
    this.storage.getItem('a');
  }
}

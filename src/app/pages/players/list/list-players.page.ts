import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { PlayerList } from "../../../models/player.model";
import { StoreState } from "../../../store/store.state";
import * as PLAYERS_SELECTORS from '../../../store/players/players.selectors';
import * as PLAYERS_ACTIONS from '../../../store/players/players.actions';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.page.html'
})
export class ListPlayersPage implements OnInit {
  playersList$: Observable<PlayerList[]>;

  constructor(
    private readonly store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.playersList$ = this.store.select(PLAYERS_SELECTORS.getPlayers);
  }

  setCurrentPlayer(currentPlayer: string): void {
    this.store.dispatch(PLAYERS_ACTIONS.saveCurrentPlayer({ currentPlayer }));
  }
}

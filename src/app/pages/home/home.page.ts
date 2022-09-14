import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoreState } from '../../store/store.state';
import * as PLAYERS_SELECTORS from '../../store/players/players.selectors';
import * as SCORES_SELECTORS from '../../store/score/score.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  hasCurrentPlayer: Observable<boolean>;
  currentPlayer: Observable<string>;
  hasPlayers: Observable<boolean>;
  hasScores: Observable<boolean>;

  constructor(
    private readonly store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    this.hasCurrentPlayer = this.store.select(PLAYERS_SELECTORS.getHasCurrentPlayer);
    this.currentPlayer = this.store.select(PLAYERS_SELECTORS.getCurrentPlayer);
    this.hasPlayers = this.store.select(PLAYERS_SELECTORS.getHasPlayers);
    this.hasScores = this.store.select(SCORES_SELECTORS.getHasScores);
  }
}


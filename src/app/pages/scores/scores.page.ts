import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app/app.state';
import * as SCORES_MODEL from '../../models/scores/scores.models';
import * as SCORES_SELECTORS from '../../store/scores/scores.selectors';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html'
})
export class ScoresPage implements OnInit {
  currentPlayerScore: Observable<SCORES_MODEL.ScoresListItem>;
  otherPlayersScores: Observable<SCORES_MODEL.ScoresListItem[]>;
  currentPlayerHasScores: Observable<boolean>;
  otherPlayersHaveScores: Observable<boolean>;

  constructor(
    private readonly store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    this.currentPlayerHasScores = this.store.select(SCORES_SELECTORS.getCurrentPlayerHasScores);
    this.otherPlayersHaveScores = this.store.select(SCORES_SELECTORS.getOtherPlayersHaveScores);
    this.currentPlayerScore = this.store.select(SCORES_SELECTORS.getScoresCurrentPlayer);
    this.otherPlayersScores = this.store.select(SCORES_SELECTORS.getScoresOtherPlayers);
  }
}

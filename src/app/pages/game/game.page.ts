import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { StoreState } from "../../store/store.state";
import * as SCORES_ACTIONS from '../../store/scores/scores.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html'
})
export class GamePage {
  constructor(
    private readonly store: Store<StoreState>
  ){}

  newScore(): void {
    this.store.dispatch(SCORES_ACTIONS.newScore({
      score: Math.round(Math.random() * 50)
    }));
  }
}

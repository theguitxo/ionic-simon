import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ScoresListItem } from "../../models/scores.model";
import { StoreState } from "../../store/store.state";
import * as SCORES_SELECTORS from '../../store/scores/scores.selectors';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html'
})
export class ScoresPage implements OnInit {
  scoresList$: Observable<ScoresListItem[]>;

  constructor(
    private readonly store: Store<StoreState>
  ){}

  ngOnInit(): void {
    this.scoresList$ = this.store.select(SCORES_SELECTORS.getScoresList);
  }
}

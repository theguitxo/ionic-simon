import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { StoreState } from "src/app/store/store.state";

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.page.html'
})
export class ListPlayersPage {

  constructor(
    private readonly store: Store<StoreState>
  ) {}
}

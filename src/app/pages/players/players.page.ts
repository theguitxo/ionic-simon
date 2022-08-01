import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTitle } from 'src/app/store/store.selectors';
import { StoreState } from 'src/app/store/store.state';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  title!: Observable<string>;

  constructor(
    private readonly store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.title = this.store.select(selectTitle);
  }
}
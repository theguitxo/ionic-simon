import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PLAYERS_SELECTORS from '../../store/players/players.selectors';
import { PlayersState } from '../../store/players/players.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave {
  hasCurrentPlayer!: Observable<boolean>;
  hasPlayers!: Observable<boolean>;

  constructor(
    private readonly players: Store<PlayersState>
  ) {}

  ngOnInit(): void {
    this.hasCurrentPlayer = this.players.select(PLAYERS_SELECTORS.getHasCurrentPlayer);
    this.hasPlayers = this.players.select(PLAYERS_SELECTORS.getHasPlayers);
    console.log('on init');
  }

  ngOnDestroy(): void {
    console.log('no destroy');
  }

  ionViewDidEnter(): void {
    console.log('ion view did enter');
  }

  ionViewDidLeave(): void {
    console.log('ion view did leave');
  }

  ionViewWillEnter(): void {
    console.log('ion view will enter');
  }

  ionViewWillLeave(): void {
    console.log('ion view will leave');
  }
}


import { Component, OnInit } from "@angular/core";
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { getButtonsEnabled, getGameSequence, getGameStarted, getPlayingSequence } from "../../store/game/game.selectors";
import { StoreState } from "../../store/store.state";
import * as GAME_ACTIONS from '../../store/game/game.actions';
import { COLOR_CODES } from "../../models/game.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePage implements OnInit, ViewDidEnter, ViewDidLeave {
  gameStarted: Observable<boolean>;
  playingSequence: Observable<boolean>;

  blueCode = COLOR_CODES.BLUE;
  redCode = COLOR_CODES.RED;
  yellowCode = COLOR_CODES.YELLOW;
  greenCode = COLOR_CODES.GREEN;

  colorAudios = new Map()
    .set(COLOR_CODES.BLUE, './assets/audios/set1/blue.wav')
    .set(COLOR_CODES.RED, './assets/audios/set1/red.wav')
    .set(COLOR_CODES.YELLOW, './assets/audios/set1/yellow.wav')
    .set(COLOR_CODES.GREEN, './assets/audios/set1/green.wav');

  subscriptions: Subscription[] = [];

  audio: HTMLAudioElement = new Audio();

  sequence: COLOR_CODES[] = [];
  indexSequence: number;

  constructor(
    private readonly store: Store<StoreState>
  ){}

  ngOnInit(): void {
    this.gameStarted = this.store.select(getGameStarted);
    this.playingSequence = this.store.select(getPlayingSequence);
  }

  ionViewDidEnter(): void {
    this.setSubscriptions();
    this.audio.addEventListener('loadeddata', () => this.playAudio());
    this.audio.addEventListener('ended', () => this.audioEnded());
  }

  ionViewDidLeave(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
    this.audio.removeEventListener('loadeddata', () => this.playAudio());
    this.audio.removeEventListener('ended', () => this.audioEnded());
  }

  startGame(): void {
    
    this.store.dispatch(GAME_ACTIONS.initGame());

    this.addAndPlaySequence();
  }

  stopGame(): void {
    this.store.dispatch(GAME_ACTIONS.stopGame());
  }

  lightPressed(code: COLOR_CODES): void {
    this.store.select(getButtonsEnabled).pipe(take(1))
      .subscribe((value: boolean) => {
        if (value) {
          console.log(code);
        }
      });
  }

  private setSubscriptions(): void {
    this.subscriptions.push(
      this.store.select(getGameSequence).subscribe((sequence: COLOR_CODES[]) => {
        if (sequence.length) {
          this.sequence = sequence;
          this.indexSequence = 0;
          setTimeout(() => this.playSequence(), 1000);
        }
      })
    );
  }

  private playSequence(): void {
    this.audio.src = this.colorAudios.get(this.sequence[this.indexSequence]);
  }

  private playAudio(): void {
    this.audio.play();
  }

  private audioEnded(): void {
    const newIndexSequence = this.indexSequence + 1;
    if (newIndexSequence < this.sequence.length) {
      this.indexSequence = newIndexSequence;
      this.playSequence();
    }
  }

  private addAndPlaySequence(): void {
    this.store.dispatch(GAME_ACTIONS.newInSequence());
    this.store.dispatch(GAME_ACTIONS.playSequence());
  }
}

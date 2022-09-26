import { Component, OnInit } from "@angular/core";
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { StoreState } from "../../store/store.state";
import * as GAME_ACTIONS from '../../store/game/game.actions';
import * as GAME_SELECTORS from "../../store/game/game.selectors";
import { COLOR_CODES } from "../../models/game.model";
import * as APP_ACTIONS from '../../store/store.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePage implements OnInit, ViewDidEnter, ViewDidLeave {
  gameStarted: Observable<boolean>;
  playingSequence: boolean;
  score: Observable<number>;

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

  sequence: COLOR_CODES[] = [];
  indexSequence: number;
  colorPlaying: COLOR_CODES;

  audio: HTMLAudioElement = new Audio();

  constructor(
    private readonly store: Store<StoreState>
  ){}

  ngOnInit(): void {
    this.gameStarted = this.store.select(GAME_SELECTORS.getGameStarted);
    this.score = this.store.select(GAME_SELECTORS.getScore);

    this.audio.onloadeddata = () => this.playAudio();
    this.audio.onended = () => this.audioEnded();
  }

  ionViewDidEnter(): void {
    this.setSubscriptions();
  }

  ionViewDidLeave(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
    this.store.dispatch(GAME_ACTIONS.resetGameData());
  }

  startGame(): void {
    this.store.dispatch(GAME_ACTIONS.initGame());
    this.addAndPlaySequence();
  }

  stopGame(): void {
    // this.store.dispatch(GAME_ACTIONS.stopGame());
    this.store.dispatch(APP_ACTIONS.showAlert({
      options: {
        showAlert: true,
        text: 'hola',
        showAccept: true,
        showCancel: true,
        AcceptText: 'ok',
        CancelText: 'cancel'
      }
    }))
  }

  lightPressed(code: COLOR_CODES): void {
    this.store.select(GAME_SELECTORS.getButtonsEnabled).pipe(take(1))
      .subscribe((value: boolean) => {
        if (value) {
          this.store.dispatch(GAME_ACTIONS.startPlayerAction());
          this.playButtonSound(code);
        }
      });
  }

  private setSubscriptions(): void {
    this.subscriptions.push(
      this.store
        .select(GAME_SELECTORS.getPlayingSequence)
        .subscribe((value: boolean) => this.playingSequence = value)
    );

    this.subscriptions.push(
      this.store
        .select(GAME_SELECTORS.getGameSequence)
        .subscribe((sequence: COLOR_CODES[]) => this.initSequence(sequence))
    );

    this.subscriptions.push(
      this.store
        .select(GAME_SELECTORS.getContinueGame)
        .subscribe((value: boolean) => this.canContinueGame(value))
    );
  }

  private canContinueGame(canContinue: boolean): void {
    if (canContinue) {
      this.addAndPlaySequence();
    }
  }

  private initSequence(sequence): void {
    if (sequence.length) {
      this.sequence = sequence;
      this.indexSequence = 0;
      setTimeout(() => this.playButtonSound(), 1000);
    }
  }

  private playButtonSound(colorCode?: COLOR_CODES): void {
    if (this.playingSequence) {
      this.audio.src = this.colorAudios.get(this.sequence[this.indexSequence]);
    } else {
      this.colorPlaying = colorCode;
      this.audio.src = this.colorAudios.get(colorCode);
    }
  }

  private playAudio(): void {
    if (this.playingSequence) {
      this.colorPlaying = this.sequence[this.indexSequence];
    }
    this.audio.play();
  }

  private audioEnded(): void {
    if (this.playingSequence) {
      if (this.sequence[this.indexSequence + 1]) {
        this.indexSequence++;
        this.playButtonSound();
      } else {
        this.store.dispatch(GAME_ACTIONS.stopPlayingSequence());
      }
    } else {
      this.store.dispatch(GAME_ACTIONS.checkPlayerAction({ colorCode: this.colorPlaying}));
    }
    this.colorPlaying = null;
  }

  private addAndPlaySequence(): void {
    this.store.dispatch(GAME_ACTIONS.newInSequence());
    this.store.dispatch(GAME_ACTIONS.startPlayingSequence());
  }
}

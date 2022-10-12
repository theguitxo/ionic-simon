import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { AppState } from "../../store/app/app.state";
import * as GAME_ACTIONS from '../../store/game/game.actions';
import * as GAME_SELECTORS from "../../store/game/game.selectors";
import * as APP_ACTIONS from '../../store/app/app.actions';
import * as SCORE_ACTIONS from '../../store/scores/scores.actions';
import * as GAME_MODEL from "../../models/game/game.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePage implements ViewDidEnter, ViewDidLeave {
  blueCode = GAME_MODEL.COLOR_CODES.BLUE;
  redCode = GAME_MODEL.COLOR_CODES.RED;
  yellowCode = GAME_MODEL.COLOR_CODES.YELLOW;
  greenCode = GAME_MODEL.COLOR_CODES.GREEN;

  subscriptions: Subscription[] = [];

  gameStarted: Observable<boolean>;
  playingSequence: boolean;
  score: number;
  colorPlaying: GAME_MODEL.COLOR_CODES;

  audio: HTMLAudioElement = new Audio();

  gameMessage: Observable<string>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService
  ){}

  ionViewDidEnter(): void {
    this.setSubscriptions();
    this.setAudioEvents();
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
    this.store.dispatch(APP_ACTIONS.showAlert({
      options: {
        showAlert: true,
        text: this.translate.instant('game.confirmStopGame'),
        showAccept: true,
        showCancel: true,
        AcceptText: this.translate.instant('buttons.yes'),
        CancelText: this.translate.instant('buttons.no'),
        additionalAcceptActions: [
          SCORE_ACTIONS.newScore({ score: this.score }),
          GAME_ACTIONS.resetGameData(),
          GAME_ACTIONS.stopGame()
        ],
        redirectOnAccept: true,
        redirectOnCancel: false
      }
    }))
  }

  lightPressed(colorCode: GAME_MODEL.COLOR_CODES): void {
    this.store.select(GAME_SELECTORS.getButtonsEnabled).pipe(take(1))
      .subscribe((value: boolean) => {
        if (value) {
          this.store.dispatch(GAME_ACTIONS.startPlayerAction({ colorCode }));
        }
      });
  }

  private setAudioEvents() {
    this.audio.onloadeddata = () => this.playAudio();
    this.audio.onended = () => this.audioEnded();
  }

  private setSubscriptions(): void {
    this.gameStarted = this.store.select(GAME_SELECTORS.getGameStarted);
    this.gameMessage = this.store.select(GAME_SELECTORS.getGameMessage);

    this.subscriptions.push(
      this.store
        .select(GAME_SELECTORS.getPlayingSequence)
        .subscribe((value: boolean) => this.playingSequence = value)
    );

    this.subscriptions.push(
      this.store
        .select(GAME_SELECTORS.getContinueGame)
        .subscribe((value: boolean) => setTimeout(() =>this.canContinueGame(value), 500))
    );

    this.subscriptions.push(
      this.store
        .select(GAME_SELECTORS.getScore)
        .subscribe((value: number) => this.score = value)
    );

    this.subscriptions.push(
      this.store
        .select(GAME_SELECTORS.getGameOver)
        .subscribe((value: boolean) => this.checkGameOver(value))
    );

    this.subscriptions.push(
      this.store
        .select(GAME_SELECTORS.getPlayingInSequence)
        .subscribe((data: GAME_MODEL.CurrentColorPlay) => this.playSequenceAudio(data))
    );

    this.subscriptions.push(
      this.store
        .select(GAME_SELECTORS.getColorCodePlayerCheck)
        .subscribe((colorCode: GAME_MODEL.COLOR_CODES | null) => this.colorPlaying = colorCode)
    );

    this.subscriptions.push(
      this.store
        .select(GAME_SELECTORS.getAudioColorCodePlayerCheck)
        .subscribe((audioPath: string) => this.playPlayerAudio(audioPath))
    );
  }

  private canContinueGame(canContinue: boolean): void {
    if (canContinue) {
      this.addAndPlaySequence();
    }
  }

  private playSequenceAudio(data: GAME_MODEL.CurrentColorPlay): void {
    if (data.soundPath) {
      setTimeout(() => {
        this.colorPlaying = data.colorCodePlaying;
        this.audio.src = data.soundPath;
      }, data.index > 0 ? 250 : 500);
    }
  }

  private playPlayerAudio(audioPath: string): void {
    if (audioPath) {
      this.audio.src = audioPath;
    }
  }

  private playAudio(): void {
    this.audio.play();
  }

  private audioEnded(): void {
    if (this.playingSequence) {
      this.store.dispatch(GAME_ACTIONS.nextPlayingSequence());
    } else {
      this.store.dispatch(GAME_ACTIONS.checkPlayerAction());
    }
    this.colorPlaying = null;
  }

  private addAndPlaySequence(): void {
    this.store.dispatch(GAME_ACTIONS.newInSequence());
    this.store.dispatch(GAME_ACTIONS.startPlayingSequence());
  }

  private checkGameOver(gameOver: boolean): void {
    if (gameOver) {
      this.store.dispatch(APP_ACTIONS.showAlert({
        options: {
          showAlert: true,
          text: this.translate.instant('game.gameOver', { score: this.score }),
          showAccept: true,
          AcceptText: this.translate.instant('buttons.accept'),
          additionalAcceptActions: [
            SCORE_ACTIONS.newScore({ score: this.score }),
            GAME_ACTIONS.resetGameData(),
            GAME_ACTIONS.stopGame()
          ],
          redirectOnAccept: true
        }
      }))
    }
  }
}

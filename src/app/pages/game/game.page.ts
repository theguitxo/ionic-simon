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

/**
 * EN: Component for the page of the game.
 * 
 * ES: Componente para la página del juego.
 */
@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePage implements ViewDidEnter, ViewDidLeave {
  /**
   * EN: Code for blue.
   * 
   * ES: Código para azul.
   */
  blueCode = GAME_MODEL.COLOR_CODES.BLUE;
    /**
   * EN: Code for red.
   * 
   * ES: Código para rojo.
   */
  redCode = GAME_MODEL.COLOR_CODES.RED;
    /**
   * EN: Code for yellow.
   * 
   * ES: Código para amarillo.
   */
  yellowCode = GAME_MODEL.COLOR_CODES.YELLOW;
    /**
   * EN: Code for green.
   * 
   * ES: Código para verde.
   */
  greenCode = GAME_MODEL.COLOR_CODES.GREEN;
  /**
   * EN: Subscriptions list of the component.
   * 
   * ES: Lista de suscripciones del componente.
   */
  subscriptions: Subscription[] = [];
  /**
   * EN: Score of the game.
   * 
   * ES: Puntuación del juego.
   */
  score: number;
    /**
   * EN: Code color that is playing (in sequence or when player presses a button).
   * 
   * ES: Código de color que se está reproduciendo (en secuencia o cuando el jugador presiona un botón).
   */
  colorPlaying: GAME_MODEL.COLOR_CODES;
  /**
   * EN: Audio object, to play sounds.
   * 
   * ES: Objeto de audio, para reproducir sonidos.
   */
  audio: HTMLAudioElement = new Audio();
  /**
   * EN: Indicator if game was started.
   * 
   * ES: Indicador de si se inició el juego.
   */
  gameStarted: Observable<boolean>;
    /**
   * EN: Message to show in the page bottom.
   * 
   * ES: Mensaje para mostrar en la parte inferior de la página.
   */
  gameMessage: Observable<string>;
    /**
   * EN: If the stop game button must be disabled.
   * 
   * ES: Si el botón de detener el juego debe estar deshabilitado.
   */
  disableStopGameButton: Observable<boolean>;

  /**
   * EN: Constructor for the component.
   * 
   * ES: Constructor del componente.
   * @param {Store<AppState>} store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación. 
   * @param {TranslateService} translate EN: Service of Angular to manage the translations. / ES: Servicio de Angular para gestionar las traducciones. 
   */
  constructor(
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService
  ){}

  /**
   * EN: Inits the subscriptions and the audio events.
   * 
   * ES: Inicia las suscripciones y los eventos de audio.
   */
  ionViewDidEnter(): void {
    this.setSubscriptions();
    this.setAudioEvents();
  }

  /**
   * EN: Unsubscribe the subscriptions and resets the data.
   * 
   * ES: Da de baja las suscripciones y resetea los datos.
   */
  ionViewDidLeave(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
    this.store.dispatch(GAME_ACTIONS.resetGameData());
  }

  /**
   * EN: Starts a new game.
   * 
   * ES: Comienza un nuevo juego.
   */
  startGame(): void {
    this.store.dispatch(GAME_ACTIONS.initGame());
    this.addAndPlaySequence();
  }

  /**
   * EN: Stops a game.
   * 
   * ES: Detiene un juego.
   */
  stopGame(): void {
    this.store.dispatch(GAME_ACTIONS.pauseGame());
    this.store.dispatch(APP_ACTIONS.showAlert({
      options: {
        showAlert: true,
        text: this.translate.instant('game.confirmStopGame'),
        showAccept: true,
        showCancel: true,
        AcceptText: this.translate.instant('buttons.yes'),
        CancelText: this.translate.instant('buttons.no'),
        additionalAcceptActions: [
          GAME_ACTIONS.resumeGame(),
          SCORE_ACTIONS.newScore({ score: this.score }),
          GAME_ACTIONS.resetGameData(),
          GAME_ACTIONS.stopGame()
        ],
        additionalCancelActions: [
          GAME_ACTIONS.resumeGame()
        ],
        redirectOnAccept: true,
        redirectOnCancel: false
      }
    }))
  }

  /**
   * EN: Starts the actions to check a color when the player presses a button.
   * 
   * ES: Inicia las acciones para comprobar un color cuando el jugador presiona un botón.
   */
  lightPressed(colorCode: GAME_MODEL.COLOR_CODES): void {
    this.store.select(GAME_SELECTORS.getButtonsEnabled).pipe(take(1))
      .subscribe((value: boolean) => {
        if (value) {
          this.store.dispatch(GAME_ACTIONS.startPlayerAction({ colorCode }));
        }
      });
  }

  /**
   * EN: Inits the audio events for audio when is loaded and finish their playing.
   * 
   * ES: Inicia los eventos de audio para el audio cuando se carga y finaliza su reproducción.
   */
  private setAudioEvents() {
    this.audio.onloadeddata = () => this.playAudio();
    this.audio.onended = () => this.audioEnded();
  }

  /**
   * EN: Sets the subscriptions needed by the component.
   * 
   * ES: Establece las suscripciones que necesita el componente.
   */
  private setSubscriptions(): void {
    this.gameStarted = this.store.select(GAME_SELECTORS.getGameStarted);
    this.gameMessage = this.store.select(GAME_SELECTORS.getGameMessage);
    this.disableStopGameButton = this.store.select(GAME_SELECTORS.getDisableStopGameButton);

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

  /**
   * EN: Checks if the repeated sequence is correct and adds a new item in the sequence to repeat.
   * 
   * ES: Comprueba si la secuencia repetida es correcta y agrega un nuevo elemento en la secuencia para repetir.
   * @param {boolean} canContinue EN: Indicator if the repeat is correct and can continue. / ES: Indicador si la repetición es correcta y puede continuar.
   */
  private canContinueGame(canContinue: boolean): void {
    if (canContinue) {
      this.addAndPlaySequence();
    }
  }

  /**
   * EN: Plays an audio of a sequence (to repeat or of the game player).
   * 
   * ES: Reproduce un audio de una secuencia (a repetir o del jugador del juego).
   * @param {CurrentColorPlay} data EN: Information about the audio to play, the color and their position in the sequence. / ES: Información sobre el audio a reproducir, el color y su posición en la secuencia.
   */
  private playSequenceAudio(data: GAME_MODEL.CurrentColorPlay): void {
    if (data.soundPath) {
      setTimeout(() => {
        this.colorPlaying = data.colorCodePlaying;
        this.audio.src = data.soundPath;
      }, data.index > 0 ? 250 : 500);
    }
  }

  /**
   * EN: Sets a path into the audio object to play.
   * 
   * ES: Establece una ruta en el objeto de audio para reproducir.
   * @param {string} audioPath EN: Path to the audio file. / ES: Ruta al archivo de audio.
   */
  private playPlayerAudio(audioPath: string): void {
    if (audioPath) {
      this.audio.src = audioPath;
    }
  }

  /**
   * EN: Plays an audio from the audio object.
   * 
   * ES: Reproduce un audio del objeto de audio.
   */
  private playAudio(): void {
    this.audio.play();
  }

  /**
   * EN: Event to execute when the sound is ended, according is repeating sequence or is the player gaming.
   * 
   * ES: Evento a ejecutar cuando finaliza el sonido, según se repita la secuencia o el jugador esté jugando.
   */
  private audioEnded(): void {
    this.store
    .select(GAME_SELECTORS.getPlayingSequence)
    .pipe(take(1))
    .subscribe((value: boolean) => {
      if (value) {
        this.store.dispatch(GAME_ACTIONS.nextPlayingSequence());
      } else {
        this.store.dispatch(GAME_ACTIONS.checkPlayerAction());
      }
      this.colorPlaying = null;
    });
  }

  /**
   * EN: Adds a new color to the sequence and plays it.
   * 
   * ES: Agrega un nuevo color a la secuencia y la reproduce.
   */
  private addAndPlaySequence(): void {
    this.store.dispatch(GAME_ACTIONS.newInSequence());
    this.store.dispatch(GAME_ACTIONS.startPlayingSequence());
  }

  /**
   * EN: Shows a message if the game is over.
   * 
   * ES: Muestra un mensaje si el juego ha terminado.
   * @param {boolean} gameOver: EN: If game is over. / ES: Si el juego ha terminado.
   */
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

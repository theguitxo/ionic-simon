import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app/app.state';
import * as PLAYERS_SELECTORS from '../../store/players/players.selectors';
import * as SCORES_SELECTORS from '../../store/scores/scores.selectors';

/**
 * EN: Component for the home page.
 * 
 * ES: Componente para la página de inicio.
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  /**
   * EN: If there are current player.
   * 
   * ES: Si hay jugador actual.
   */
  hasCurrentPlayer: Observable<boolean>;
  /**
   * EN: Current player name.
   * 
   * ES: Nombre del jugador actual.
   */
  currentPlayer: Observable<string>;
  /**
   * EN: Current player avatar.
   * 
   * ES: Avatar del jugador actual.
   */
  currentPlayerAvatar: Observable<string>;
  /**
   * EN: If there are player in the application.
   * 
   * ES: Si hay jugador en la aplicación.
   */
  hasPlayers: Observable<boolean>;
  /**
   * EN: If there are game scores in the application.
   * 
   * ES: Si hay puntuaciones de juegos en la aplicación.
   */
  hasScores: Observable<boolean>;

  /**
   * EN: Constructor for the class.
   * 
   * ES: Constructor de la clase.
   * @param {Store<AppState>} store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación.
   */
  constructor(
    private readonly store: Store<AppState>
  ) {}

  /**
   * EN: Sets the subscriptions of the component.
   * 
   * ES: Establece las suscripciones del componente.
   */
  ngOnInit(): void {
    this.initSubscriptions();
  }

  /**
   * EN: Inits the subscriptions, that don't need unsubscribe method because there use the async pipe in the template.
   * 
   * ES: Inicia las suscripciones, que no necesitan un método de cancelación de suscripción porque usan la tubería asíncrona en la plantilla.
   */
  private initSubscriptions(): void {
    this.hasCurrentPlayer = this.store.select(PLAYERS_SELECTORS.getHasCurrentPlayer);
    this.currentPlayer = this.store.select(PLAYERS_SELECTORS.getCurrentPlayerName);
    this.currentPlayerAvatar = this.store.select(PLAYERS_SELECTORS.getCurrentPlayerAvatar);
    this.hasPlayers = this.store.select(PLAYERS_SELECTORS.getHasPlayers);
    this.hasScores = this.store.select(SCORES_SELECTORS.getHasScores);
  }
}


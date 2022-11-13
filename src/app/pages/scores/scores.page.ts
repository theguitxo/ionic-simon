import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app/app.state';
import * as SCORES_MODEL from '../../models/scores/scores.models';
import * as SCORES_SELECTORS from '../../store/scores/scores.selectors';

/**
 * EN: Component for the page of the game scores list.
 * 
 * ES: Componente para la página de la lista de puntuaciones del juego.
 */
@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html'
})
export class ScoresPage implements OnInit {
  /**
   * EN: Scores of the current player.
   * 
   * ES: Puntuaciones del jugador actual.
   */
  currentPlayerScore: Observable<SCORES_MODEL.ScoresListItem>;
  /**
   * EN: Scores of other players that aren't the current player.
   * 
   * ES: Decenas de otros jugadores que no son el jugador actual.
   */
  otherPlayersScores: Observable<SCORES_MODEL.ScoresListItem[]>;
  /**
   * EN: If there are scores for the current player.
   * 
   * ES: Si hay puntuaciones para el jugador actual.
   */
  currentPlayerHasScores: Observable<boolean>;
  /**
   * EN: If there are scores for other players that aren't the current player.
   * 
   * ES: Si hay puntuaciones de otros jugadores que no son el jugador actual.
   */
  otherPlayersHaveScores: Observable<boolean>;

  /**
   * EN: Constructor for the class.
   * 
   * ES: Constructor de la clase.
   * @param {Store<AppState>} store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación. 
   */
  constructor(
    private readonly store: Store<AppState>
  ){}

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
    this.currentPlayerHasScores = this.store.select(SCORES_SELECTORS.getCurrentPlayerHasScores);
    this.otherPlayersHaveScores = this.store.select(SCORES_SELECTORS.getOtherPlayersHaveScores);
    this.currentPlayerScore = this.store.select(SCORES_SELECTORS.getScoresCurrentPlayer);
    this.otherPlayersScores = this.store.select(SCORES_SELECTORS.getScoresOtherPlayers);
  }
}

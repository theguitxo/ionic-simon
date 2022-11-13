import { Component, Input } from '@angular/core';
import * as SCORES_MODEL from "../../../models/scores/scores.models";

/**
 * EN: Component to list the scores of a player.
 * 
 * ES: Componente para listar las puntuaciones de un jugador.
 */
@Component({
  selector: 'app-scores-list',
  templateUrl: './scores-list.component.html',
  styleUrls: ['./scores-list.component.scss']
})
export class ScoresListComponent {
  /**
   * EN: Title that shows if is the current player or not.
   * 
   * ES: Título que muestra si es el jugador actual o no.
   */
  @Input() playerTypeTitle: string;
  /**
   * EN: Scores list to show.
   * 
   * ES: Lista de puntuaciones para mostrar.
   */
  @Input() scoresList: SCORES_MODEL.ScoresListItem[];
}

import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../../../store/app/app.state";
import { TranslateService } from "@ngx-translate/core";
import * as PLAYER_MODEL from "../../../models/player/player.models";
import * as PLAYERS_SELECTORS from '../../../store/players/players.selectors';
import * as PLAYERS_ACTIONS from '../../../store/players/players.actions';
import * as APP_ACTIONS from '../../../store/app/app.actions';
import * as SCORES_ACTIONS from '../../../store/scores/scores.actions';
import { AppActionSheetButton } from "src/app/models/app/app.models";

/**
 * EN: Component for the players list page.
 * 
 * ES: Componente para la página de lista de jugadores.
 */
@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.page.html',
  styleUrls: ['./list-players.page.scss']
})
export class ListPlayersPage implements OnInit {
  /**
   * EN: Players list.
   * 
   * ES: Lista de jugadores.
   */
  playersList$: Observable<PLAYER_MODEL.PlayerList[]>;

  /**
   * EN: Constructor for the class.
   * 
   * ES: Constructor de la clase.
   * @param {Store<AppState>} store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación.
   * @param {TranslateService} translate EN: Service of Angular to manage the translations. / ES: Servicio de Angular para gestionar las traducciones.
   */
  constructor(
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService
  ) {}

  /**
   * EN: Sets the players list in the component property.
   * 
   * ES: Establece la lista de jugadores en la propiedad del componente.
   */
  ngOnInit(): void {
    this.playersList$ = this.store.select(PLAYERS_SELECTORS.getPlayers);
  }

  /**
   * EN: Calls the action to set a player as the current.
   * 
   * ES: Llama a la acción para establecer un jugador como el actual.
   * @param {string} currentPlayer EN: Identification of the new current player. / ES: Identificación del nuevo jugador actual.
   */
  setCurrentPlayer(currentPlayer: string): void {
    this.store.dispatch(PLAYERS_ACTIONS.saveCurrentPlayer({ currentPlayer }));
  }

  /**
   * EN: Opens the options menu for a player.
   * 
   * ES: Abre el menú de opciones para un jugador.
   * @param {PlayerList} player EN: Information of the player for use in the options menu. / ES: Información del jugador para usar en el menú de opciones.
   */
  async openOptionsMenu(player: PLAYER_MODEL.PlayerList) {
    const buttons: AppActionSheetButton[] = [];

    if (!player.isCurrent) {
      buttons.push(
        {
          text: this.translate.instant('player.options.removePlayer'),
          actions: [
            SCORES_ACTIONS.removeScores({
              player,
              removePlayer: true
            })
          ],
          confirm: {
            useConfirm: true,
            confirmText: this.translate.instant('player.messages.confirmRemovePlayer', { name: player.name }),
            redirectOnConfirm: false,
            redirectOnCancel: false
          }
        }
      );
      buttons.push({
        text: this.translate.instant('player.options.setCurrent'),
        actions: [
          PLAYERS_ACTIONS.changeCurrentPlayer({
            player,
          })
        ]
      });
    }

    buttons.push({
      text: this.translate.instant('player.options.removePlayerScores'),
      actions: [
        SCORES_ACTIONS.removeScores({
          player,
          removePlayer: false
        })
      ]
    });

    this.store.dispatch(APP_ACTIONS.showActionSheet({
      options: {
        header: player.name,
        subHeader: this.translate.instant('common.options'),
        buttons
      }
    }));
  }
}

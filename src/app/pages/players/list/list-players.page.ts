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

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.page.html'
})
export class ListPlayersPage implements OnInit {
  playersList$: Observable<PLAYER_MODEL.PlayerList[]>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.playersList$ = this.store.select(PLAYERS_SELECTORS.getPlayers);
  }

  setCurrentPlayer(currentPlayer: string): void {
    this.store.dispatch(PLAYERS_ACTIONS.saveCurrentPlayer({ currentPlayer }));
  }

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

    this.store.dispatch(APP_ACTIONS.showActionSheet({
      options: {
        header: player.name,
        subHeader: this.translate.instant('common.options'),
        buttons
      }
    }));
  }
}

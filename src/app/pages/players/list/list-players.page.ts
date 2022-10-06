import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { PlayerList } from "../../../models/player/player.model";
import { AppState } from "../../../store/app/app.state";
import * as PLAYERS_SELECTORS from '../../../store/players/players.selectors';
import * as PLAYERS_ACTIONS from '../../../store/players/players.actions';
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.page.html'
})
export class ListPlayersPage implements OnInit {
  playersList$: Observable<PlayerList[]>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit(): void {
    this.playersList$ = this.store.select(PLAYERS_SELECTORS.getPlayers);
  }

  setCurrentPlayer(currentPlayer: string): void {
    this.store.dispatch(PLAYERS_ACTIONS.saveCurrentPlayer({ currentPlayer }));
  }

  async openOptionsMenu(player: PlayerList) {
  }
  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: 'Example header',
  //     subHeader: 'Example subheader',
  //     buttons: [
  //       {
  //         text: 'Delete',
  //         role: 'destructive',
  //         data: {
  //           action: 'delete',
  //         },
  //       },
  //       {
  //         text: 'Share',
  //         data: {
  //           action: 'share',
  //         },
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         data: {
  //           action: 'cancel',
  //         },
  //       },
  //     ],
  //   });

  //   await actionSheet.present();

  //   actionSheet.onDidDismiss().then(data => {
  //     console.log(data);
  //   });
  // }
}

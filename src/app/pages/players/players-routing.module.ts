import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListPlayersPage } from "./list/list-players.page";
import { NewPlayerPage } from "./new/new-player.page";
import { PlayersPage } from "./players.page";

const routes: Routes = [
  {
    path: '',
    component: PlayersPage,
    children: [
      {
        path: 'list',
        component: ListPlayersPage,
        title: 'player.players'
      },
      {
        path: 'new',
        component: NewPlayerPage,
        title: 'player.newPlayer'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersPageRoutingModule {}

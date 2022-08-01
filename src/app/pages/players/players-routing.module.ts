import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewPlayerPage } from "./new/new-player.page";
import { PlayersPage } from "./players.page";

const routes: Routes = [
  {
    path: '',
    component: PlayersPage,
    children: [
      {
        path: 'new',
        component: NewPlayerPage,
        title: 'New player'
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersPageRoutingModule {}

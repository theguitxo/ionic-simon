import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NewPlayerPage } from "./new/new-player.page";
import { PlayersPageRoutingModule } from "./players-routing.module";
import { PlayersPage } from "./players.page";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PlayersPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PlayersPage,
    NewPlayerPage
  ]
})
export class PlayersPageModule {}

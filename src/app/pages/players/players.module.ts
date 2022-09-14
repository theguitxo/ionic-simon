import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { ListPlayersPage } from "./list/list-players.page";
import { NewPlayerPage } from "./new/new-player.page";
import { PlayersPageRoutingModule } from "./players-routing.module";
import { PlayersPage } from "./players.page";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    PlayersPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [
    PlayersPage,
    NewPlayerPage,
    ListPlayersPage
  ]
})
export class PlayersPageModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { GamePage } from "./game.page";
import { GamePageRoutingModule } from "./game-routing.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    GamePageRoutingModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [
    GamePage
  ]
})
export class GamePageModule {}

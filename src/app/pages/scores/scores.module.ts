import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { ScoresPageRoutingModule } from "./scores-routing.module";
import { ScoresPage } from "./scores.page";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ScoresPageRoutingModule,
    TranslateModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: [
    ScoresPage
  ]
})
export class ScoresPageModule {}

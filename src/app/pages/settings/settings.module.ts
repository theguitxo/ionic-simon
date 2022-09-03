import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "src/app/components/components.module";
import { SettingsPageRoutingModule } from "./settings-routing.module";
import { SettingsPage } from "./settings.page";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SettingsPageRoutingModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [
    SettingsPage
  ]
})
export class SettingsPageModule {}

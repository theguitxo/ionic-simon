import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonHeaderComponent } from "./common-header/common-header.component";

/**
 * EN: Modulo for common components.
 * 
 * ES: Módulo para componentes comunes.
 */
@NgModule({
  declarations: [
    CommonHeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    CommonHeaderComponent
  ]
})
export class ComponentsModule {}

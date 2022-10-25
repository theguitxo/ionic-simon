import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HelpPageRoutingModule } from './help-routing.module';
import { SwiperModule } from 'swiper/angular';
import { HelpPage } from './help.page';
import { AboutPage } from './about/about.page';
import { HowPlayPage } from './how-play/how-play.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HelpPageRoutingModule,
    SwiperModule,
    ComponentsModule
  ],
  declarations: [
    HelpPage,
    AboutPage,
    HowPlayPage
  ],
  providers: [
    InAppBrowser
  ]
})
export class HelpPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HelpPageRoutingModule } from './help-routing.module';
import { SwiperModule } from 'swiper/angular';
import { HelpPage } from './help.page';
import { AboutPage } from './about/about.page';
import { HowPlayPage } from './how-play/how-play.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpPageRoutingModule,
    SwiperModule
  ],
  declarations: [
    HelpPage,
    AboutPage,
    HowPlayPage
  ]
})
export class HelpPageModule {}

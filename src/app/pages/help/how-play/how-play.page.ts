import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SwiperOptions } from "swiper";
import * as HELP_MODELS from '../../../models/help/help.models';

/**
 * EN: Component that shows the 'How to play' section in help.
 * 
 * ES: Componente que muestra la sección 'Cómo jugar' en la ayuda.
 */
@Component({
  selector: 'app-how-play',
  templateUrl: './how-play.page.html',
  styleUrls: ['how-play.page.scss']
})
export class HowPlayPage implements OnInit {
  swiperOptions: SwiperOptions = {
    slidesPerView: 1,
    loop: false
  }

  slides: HELP_MODELS.SlideData[] = [];

  constructor(
    private readonly translate: TranslateService
  ){}

  ngOnInit(): void {
    this.slides = [
      {
        title: this.translate.instant('help.howToPlay.slide_1.title'),
        imagePath: '/assets/images/how_play/slide_1.svg',
        text: this.translate.instant('help.howToPlay.slide_1.text')
      },
      {
        title: this.translate.instant('help.howToPlay.slide_2.title'),
        imagePath: '/assets/images/how_play/slide_2.svg',
        text: this.translate.instant('help.howToPlay.slide_2.text')
      },
      {
        title: this.translate.instant('help.howToPlay.slide_3.title'),
        imagePath: '/assets/images/how_play/slide_3.svg',
        text: this.translate.instant('help.howToPlay.slide_3.text')
      }
    ];
  }
}

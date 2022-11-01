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
  /**
   * EN: Options for the slides viewer.
   * 
   * ES: Opciones para el visor de diapositivas.
   */
  swiperOptions: SwiperOptions = {
    slidesPerView: 1,
    loop: false
  }

  /**
   * EN: Objects list with the information of the slides.
   * 
   * ES: Lista de objetos con la información de las diapositivas.
   */
  slides: HELP_MODELS.SlideData[] = [];

  /**
   * EN: Constructor for the component
   * 
   * ES: Constructor para el componente
   * @param translate EN: Service provided by Angular for manage translations. / ES: Servicio proporcionado por Angular para gestionar traducciones.
   */
  constructor(
    private readonly translate: TranslateService
  ){}

  /**
   * EN: Angular lifecycle: sets the objects list with the information for the slides.
   * 
   * ES: Ciclo de vida angular: establece la lista de objetos con la información de las diapositivas.
   */
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

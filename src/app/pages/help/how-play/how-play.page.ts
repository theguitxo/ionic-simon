import { Component } from "@angular/core";
import { SwiperOptions } from "swiper";

@Component({
  selector: 'app-how-play',
  templateUrl: './how-play.page.html'
})
export class HowPlayPage {
  swiperOptions: SwiperOptions = {
    slidesPerView: 1,
    loop: false
  }
}

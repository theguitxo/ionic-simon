import { Component } from "@angular/core";
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html'
})
export class AboutPage {
  constructor(
    private readonly iab: InAppBrowser
  ){}

  abrir(): void {
    console.log('hola');
    const browser = this.iab.create('https://www.guitxo.com');

    console.log(browser);
  }
}

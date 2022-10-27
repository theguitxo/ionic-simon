import { Component, OnInit } from "@angular/core";
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { TranslateService } from "@ngx-translate/core";
import * as HELP_MODELS from '../../../models/help/help.models';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {
  links: HELP_MODELS.HelpAboutLink[];

  constructor(
    private readonly translate: TranslateService,
    private readonly iab: InAppBrowser
  ){}

  ngOnInit(): void {
    this.links = [
      {
        sentence: this.translate.instant('help.about.sentences.repository'),
        button: this.translate.instant('help.about.buttons.repository'),
        link: 'https://github.com/theguitxo/ionic-simon'
      },
      {
        sentence: this.translate.instant('help.about.sentences.documentation'),
        button: this.translate.instant('help.about.buttons.documentation'),
        link: ''
      }
    ]
  }

  abrir(): void {
    const browser = this.iab.create('https://www.guitxo.com');
  }
}

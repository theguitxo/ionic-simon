import { Component, OnInit } from "@angular/core";
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { TranslateService } from "@ngx-translate/core";
import { take } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app/app.state";
import * as HELP_MODELS from '../../../models/help/help.models';
import * as APP_SELECTORS from '../../../store/app/app.selectors';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {
  links: HELP_MODELS.HelpAboutLink[];

  constructor(
    private readonly translate: TranslateService,
    private readonly iab: InAppBrowser,
    private readonly store: Store<AppState>,
  ){}

  ngOnInit(): void {
    this.store.select(APP_SELECTORS.getUserLanguage)
      .pipe(take(1))
      .subscribe((lang: string) => {
        this.links = [
          {
            sentence: this.translate.instant('help.about.sentences.repository'),
            button: this.translate.instant('help.about.buttons.repository'),
            url: 'https://github.com/theguitxo/ionic-simon'
          },
          {
            sentence: this.translate.instant('help.about.sentences.documentation'),
            button: this.translate.instant('help.about.buttons.documentation'),
            url: `https://theguitxo.github.io/ionic-simon/${lang}/`
          }
        ]
      });
  }

  abrirUrl(url: string): void {
    const browser = this.iab.create(url);
  }
}

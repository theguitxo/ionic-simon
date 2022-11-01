import { Component, OnInit } from "@angular/core";
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { TranslateService } from "@ngx-translate/core";
import { take } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app/app.state";
import * as HELP_MODELS from '../../../models/help/help.models';
import * as APP_SELECTORS from '../../../store/app/app.selectors';

/**
 * EN: Component that shows the 'About' section in help.
 * 
 * ES: Componente que muestra la sección 'Acerca de' en la ayuda.
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {
  links: HELP_MODELS.HelpAboutLink[];

  /**
   * EN: Constructor for the component
   * 
   * ES: Constructor para el componente
   * @param {TranslateService} translate EN: Service provided by Angular for manage translations. / ES: Servicio proporcionado por Angular para gestionar traducciones.
   * @param {InAppBrowser} iab EN: Controller to work with the device browser. / ES: Controlador para trabajar con el navegador del dispositivo.
   * @param {Store<AppState>} store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación.
   */
  constructor(
    private readonly translate: TranslateService,
    private readonly iab: InAppBrowser,
    private readonly store: Store<AppState>,
  ){}

  /**
   * EN: Angular lifecycle: gets the language of the application and sets the list of links of the page.
   * 
   * ES: Ciclo de vida angular: obtiene el idioma de la aplicación y establece la lista de enlaces de la página.
   */
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

  /**
   * EN: Opens a link in the device browser.
   * 
   * ES: Abre un enlace en el navegador del dispositivo.
   * @param {string} url EN: The link to open. / ES: El enlace para abrir.
   */
  openUrl(url: string): void {
    this.iab.create(url);
  }
}

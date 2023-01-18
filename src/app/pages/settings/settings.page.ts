import { Component, OnDestroy, OnInit } from "@angular/core";
import { ConfigLanguageItem, StateLanguages } from "../../models/app/app.models";
import * as APP_CONSTANTS from '../../models/app/app.constants';
import { AppState } from "../../store/app/app.state";
import { Store } from "@ngrx/store";
import { getLanguages } from "../../store/app/app.selectors";
import { take } from "rxjs/operators";
import { Subscription } from "rxjs";
import { LanguageService } from "../../services/language.service";

/**
 * EN: Component for the page of settings.
 * 
 * ES: Componente para la página de configuración.
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html'
})
export class SettingsPage implements OnInit, OnDestroy {
  /**
   * EN: Subscriptions list of the component.
   * 
   * ES: Lista de suscripciones del componente.
   */
  subscriptions: Subscription = new Subscription();
  /**
   * EN: List of languages availables for the configuration.
   * 
   * ES: Lista de idiomas disponibles para la configuración.
   */
  languagesInfo: ConfigLanguageItem[] = [];
  /**
   * EN: Language code of the device.
   * 
   * ES: Código de idioma del dispositivo.
   */
  deviceLanguage: string;

  /**
   * EN: Constructor for the class.
   * 
   * ES: Constructor de la clase.
   * @param {Store<AppState>} store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación.
   * @param  {LanguageService} languageService EN: Service to manage the language information in the local storage. / ES: Servicio para gestionar la información de idiomas en el almacenamiento local.
   */
  constructor(
    private readonly store: Store<AppState>,
    private readonly languageService: LanguageService
  ) {}

  /**
   * EN: Inits the subscriptions.
   * 
   * ES: Inicia las suscripciones.
   */
  ngOnInit(): void {
    this.setSubscriptions();
  }

  /**
   * EN: Unsubscribes the subscriptions of the component.
   * 
   * ES: Da de baja las suscripciones del componente.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * EN: Changes the language.
   * 
   * ES: Cambia el idioma.
   * @param {string} language EN: EN: Code of the language to use in the application. / ES: Código del idioma a utilizar en la aplicación.
   */
  changeLanguage(language: string): void {
    this.languageService.setLanguageInStorage(language)
      .then(() => {
        this.setLanguagesInfo({
          device: this.deviceLanguage,
          user: language
        });
      });
  }

  /**
   * EN: Sets the subscriptions needed by the component.
   * 
   * ES: Establece las suscripciones que necesita el componente.
   */
  private setSubscriptions(): void {
    this.store.select(getLanguages).pipe(take(1))
      .subscribe((data: StateLanguages) => this.setLanguagesInfo(data));
  }

  /**
   * EN: Sets the language information in the translate service, local storage and state.
   * 
   * ES: Sets the language information in the translate service, local storage and state.
   * @param {StateLanguages} data EN: Information about the application language to store. / ES: Información sobre el idioma de la aplicación a almacenar.
   */
  private setLanguagesInfo(data: StateLanguages): void {
    this.deviceLanguage = data.device;
    this.languageService.setLanguageInTranslate(data.user)
      .toPromise()
      .then(() => {
        this.languageService.setLanguageInStore(data.user, 'user');
        this.languagesInfo = APP_CONSTANTS.AVAILABLE_LANGUAGES.map(item => ({
          code: item,
          selected: item === data.user
        }));
      });
  }
}

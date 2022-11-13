import { Injectable } from "@angular/core";
import { Device } from "@capacitor/device";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { StorageService } from "./storage.service";
import { AppState } from "../store/app/app.state";
import * as APP_CONSTANTS from "../models/app/app.constants";
import * as APP_ACTIONS from "../store/app/app.actions";

/**
 * EN: Service to manage the language information in the local storage.
 * 
 * ES: Servicio para gestionar la información de idiomas en el almacenamiento local.
 */
@Injectable({
  providedIn: "root"
})
export class LanguageService {
  /**
   * EN: Constructor for the service.
   * 
   * ES: Constructor para el servicio.
   * @param {StorageService} storageService EN: Service to manage the local storage. / ES: Servicio para gestionar el almacenamiento local.
   * @param {Store<AppState>} store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación. 
   * @param {TranslateService} translate EN: Service of Angular to manage the translations. / ES: Servicio de Angular para gestionar las traducciones. 
   */
  constructor (
    private readonly storageService: StorageService,
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService
  ) {}

  /**
   * EN: Gets the language of the device.
   * 
   * ES: Obtiene el idioma del dispositivo.
   * @returns {Promise<string>} EN: The code of the language. / ES: El código de la lengua.
   */
  getDeviceLanguage(): Promise<string> {
    return new Promise((resolve) => {
      Device.getLanguageCode()
        .then(info => {
          resolve(info?.value ?? APP_CONSTANTS.DEFAULT_APP_LANGUAGE);
        })
        .catch(_e => {
          resolve(APP_CONSTANTS.DEFAULT_APP_LANGUAGE);
        });
    });
  }

  /**
   * EN: Gets the language from the local storage.
   * 
   * ES: Obtiene el idioma del almacenamiento local.
   * @returns {Promise<string>} EN: The code of the language. / ES: El código de la lengua.
   */
  getLanguageFromStorage(): Promise<string> {
    return new Promise((resolve) => {
      this.storageService.get(APP_CONSTANTS.APP_LANGUAGE_KEY)
        .then((value: string) => {
          resolve(value);
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  /**
   * EN: Saves the language in the local storage.
   * 
   * ES: Guarda el idioma en el almacenamiento local.
   * @param {string} language EN: Language code./ ES: Código de idioma.
   * @returns {Promisez<void>}
   */
  setLanguageInStorage(language: string): Promise<void> {
    return new Promise((resolve) => {
      this.storageService.set(APP_CONSTANTS.APP_LANGUAGE_KEY, language)
        .then(() => {
          resolve();
        })
        .catch(() => {
          resolve();
        });
    });
  }

  /**
   * EN: Sets the language in the state.
   * 
   * ES: Establece el idioma en el estado.
   * @param {string} language EN: Language code./ ES: Código de idioma.
   * @param {languageTypeInfo} type EN: Information type to store, 'user' or 'device'. / ES: Tipo de información a almacenar, 'usuario' o 'dispositivo'.
   */
  setLanguageInStore(language: string, type: APP_CONSTANTS.languageTypeInfo): void {
    this.store.dispatch(APP_ACTIONS.setLanguage({
      infoType: type,
      value: language
    }));
  }

  /**
   * EN: Sets the language in the translate service.
   * 
   * ES: Establece el idioma en el servicio de traducción.
   * @param {string} language EN: Language code./ ES: Código de idioma.
   */
  setLanguageInTranslate(language: string): void {
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }
}

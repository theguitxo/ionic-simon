import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { from } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { LanguageService } from "../../services/language.service";
import { AppState } from "./app.state";
import * as APP_CONSTANTS from "../../models/app/app.constants";
import * as APP_ACTIONS from './app.actions';
import { Subscription } from "rxjs/internal/Subscription";

/**
 * EN: Effects for the app actions.
 * 
 * ES: Efectos para las acciones de la aplicación.
 */
@Injectable()
export class AppEffects {

  /**
   * EN: Constructor for the class.
   * 
   * ES: Constructor de la clase.
   * @param {Actions} action$ EN: Class provided by NgRx to access to the actions. / ES: Clase proporcionada por NgRx para acceder a las acciones. 
   * @param {LanguageService} languageService EN: Service to manage the language information in the local storage. / ES: Servicio para gestionar la información de idiomas en el almacenamiento local.
   * @param {Store<AppState>} store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación. 
   */
  constructor (
    private readonly action$: Actions,
    private readonly languageService: LanguageService,
    private readonly store: Store<AppState>
  ) {}

  /**
   * EN: Gets the device language and the it that is stored in the local storage (if its available) and introduce it into the state.
   * 
   * ES: Obtiene el idioma del dispositivo y el que está almacenado en el almacenamiento local (si está disponible) y lo introduce en el estado.
   */
  initLanguages$ = createEffect(() => this.action$.pipe(
    ofType(APP_ACTIONS.initLanguages),
    switchMap(() => from(
      Promise.all([
        this.languageService.getDeviceLanguage(),
        this.languageService.getLanguageFromStorage()
      ])).pipe(tap(([deviceLanguage, storageLanguage]) => {
        const appDeviceIsAvailable = APP_CONSTANTS.AVAILABLE_LANGUAGES.includes(deviceLanguage);
        const appLanguage = appDeviceIsAvailable ? deviceLanguage : APP_CONSTANTS.DEFAULT_APP_LANGUAGE;
        this.store.dispatch(APP_ACTIONS.setLanguage({
          infoType: 'device',
          value: appLanguage
        }));
        this.store.dispatch(APP_ACTIONS.setLanguage({
          infoType: 'user',
          value: storageLanguage || appLanguage
        }));
        const setLangSubscription: Subscription =
          this.languageService.setLanguageInTranslate(storageLanguage ||  deviceLanguage)
            .subscribe((data) => {
              if(Object.keys(data)?.length > 0) {
                this.store.dispatch(APP_ACTIONS.saveLanguageStorage({
                  language: storageLanguage || appLanguage
                }));
                setLangSubscription.unsubscribe();
              }
            });
      }))
    )),
    { dispatch: false}
  )

  /**
   * EN: Saves a language into the local storage.
   * 
   * ES: Guarda un idioma en el almacenamiento local.
   */
  saveLanguageStorage$ = createEffect(() => this.action$.pipe(
    ofType(APP_ACTIONS.saveLanguageStorage),
    switchMap(action => from(this.languageService.setLanguageInStorage(action.language))
      .pipe(tap(() => {
        this.store.dispatch(APP_ACTIONS.initItemReady({
          key: APP_CONSTANTS.APP_LANGUAGE_KEY
        }));
      }))
    )),
    { dispatch: false }
  )
}

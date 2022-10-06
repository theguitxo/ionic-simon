import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { from } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { LanguageService } from "../../services/language.service";
import { AppState } from "./app.state";
import * as APP_CONSTANTS from "../../models/app/app.constants";
import * as APP_ACTIONS from './app.actions';

@Injectable()
export class AppEffects {
  constructor (
    private readonly action$: Actions,
    private readonly languageService: LanguageService,
    private readonly store: Store<AppState>
  ) {}

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
        this.languageService.setLanguageInTranslate(storageLanguage ||  deviceLanguage);
        this.store.dispatch(APP_ACTIONS.saveLanguageStorage({
          language: storageLanguage || appLanguage
        }));
      }))
    )),
    { dispatch: false}
  )

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

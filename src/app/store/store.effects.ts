import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { from } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import * as APP_CONSTANTS from "../models/app.constants";
import { LanguageService } from "../services/language.service";
import * as STORE_ACTIONS from './store.actions';
import { StoreState } from "./store.state";

@Injectable()
export class StoreEffects {
  constructor (
    private readonly action$: Actions,
    private readonly languageService: LanguageService,
    private readonly store: Store<StoreState>
  ) {}

  initLanguages$ = createEffect(() => this.action$.pipe(
    ofType(STORE_ACTIONS.initLanguages),
    switchMap(() => from(
      Promise.all([
        this.languageService.getDeviceLanguage(),
        this.languageService.getLanguageFromStorage()
      ])).pipe(tap(([deviceLanguage, storageLanguage]) => {
        const appDeviceIsAvailable = APP_CONSTANTS.AVAILABLE_LANGUAGES.includes(deviceLanguage);
        const appLanguage = appDeviceIsAvailable ? deviceLanguage : APP_CONSTANTS.DEFAULT_APP_LANGUAGE;
        this.store.dispatch(STORE_ACTIONS.setLanguage({
          infoType: 'device',
          value: appLanguage
        }));
        this.store.dispatch(STORE_ACTIONS.setLanguage({
          infoType: 'user',
          value: storageLanguage || appLanguage
        }));
        this.languageService.setLanguageInTranslate(storageLanguage ||  deviceLanguage);
        this.store.dispatch(STORE_ACTIONS.saveLanguageStorage({
          language: storageLanguage || appLanguage
        }));
      }))
    )),
    { dispatch: false}
  )

  saveLanguageStorage$ = createEffect(() => this.action$.pipe(
    ofType(STORE_ACTIONS.saveLanguageStorage),
    switchMap(action => from(this.languageService.setLanguageInStorage(action.language))
      .pipe(tap(() => {
        this.store.dispatch(STORE_ACTIONS.initItemReady({
          key: APP_CONSTANTS.APP_LANGUAGE_KEY
        }));
      }))
    )),
    { dispatch: false }
  )
}

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { from } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { APP_LANGUAGE_KEY } from "../models/app.constants";
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
        this.store.dispatch(STORE_ACTIONS.setLanguage({
          infoType: 'device',
          value: deviceLanguage
        }));
        this.store.dispatch(STORE_ACTIONS.setLanguage({
          infoType: 'user',
          value: storageLanguage
        }));
        this.languageService.setLanguageInTranslate(storageLanguage ||  deviceLanguage);
        this.store.dispatch(STORE_ACTIONS.saveLanguageStorage({
          language: storageLanguage || deviceLanguage
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
          key: APP_LANGUAGE_KEY
        }));
      }))
    )),
    { dispatch: false }
  )
}

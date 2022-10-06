import { Injectable } from "@angular/core";
import { Device } from "@capacitor/device";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { StorageService } from "./storage.service";
import { AppState } from "../store/app/app.state";
import * as APP_CONSTANTS from "../models/app/app.constants";
import * as APP_MODELS from "../models/app/app.models";
import * as APP_ACTIONS from "../store/app/app.actions";

@Injectable({
  providedIn: "root"
})
export class LanguageService {
  constructor (
    private readonly storageService: StorageService,
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService
  ) {}

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

  setLanguageInStore(language: string, type: APP_MODELS.languageTypeInfo): void {
    this.store.dispatch(APP_ACTIONS.setLanguage({
      infoType: type,
      value: language
    }));
  }

  setLanguageInTranslate(language: string): void {
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }
}

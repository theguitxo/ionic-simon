import { Injectable } from "@angular/core";
import { Device } from "@capacitor/device";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { APP_LANGUAGE_KEY, DEFAULT_APP_LANGUAGE } from "../models/app.constants";
import { languageTypeInfo } from "../models/app.models";
import { setLanguage } from "../store/store.actions";
import { StoreState } from "../store/store.state";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root"
})
export class LanguageService {
  constructor (
    private readonly storageService: StorageService,
    private readonly store: Store<StoreState>,
    private readonly translate: TranslateService
  ) {}

  getDeviceLanguage(): Promise<string> {
    return new Promise((resolve) => {
      Device.getLanguageCode()
        .then(info => {
          resolve(info?.value ?? DEFAULT_APP_LANGUAGE);
        })
        .catch(_e => {
          resolve(DEFAULT_APP_LANGUAGE);
        });
    });
  }

  getLanguageFromStorage(): Promise<string> {
    return new Promise((resolve) => {
      this.storageService.get(APP_LANGUAGE_KEY)
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
      this.storageService.set(APP_LANGUAGE_KEY, language)
        .then(() => {
          resolve();
        })
        .catch(() => {
          resolve();
        });
    });
  }

  setLanguageInStore(language: string, type: languageTypeInfo): void {
    this.store.dispatch(setLanguage({
      infoType: type,
      value: language
    }));
  }

  setLanguageInTranslate(language: string): void {
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }
}

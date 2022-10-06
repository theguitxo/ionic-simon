import { Component, OnDestroy, OnInit } from "@angular/core";
import { ConfigLanguageItem, StateLanguages } from "../../models/app/app.models";
import * as APP_CONSTANTS from '../../models/app/app.constants';
import { AppState } from "../../store/app/app.state";
import { Store } from "@ngrx/store";
import { getLanguages } from "../../store/app/app.selectors";
import { take } from "rxjs/operators";
import { Subscription } from "rxjs";
import { LanguageService } from "../../services/language.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html'
})
export class SettingsPage implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  languagesInfo: ConfigLanguageItem[] = [];
  deviceLanguage: string;

  constructor(
    private readonly store: Store<AppState>,
    private readonly languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.setSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeLanguage(val): void {
    this.languageService.setLanguageInStorage(val)
      .then(() => {
        this.setLanguagesInfo({
          device: this.deviceLanguage,
          user: val
        });
      });
  }

  private setSubscriptions(): void {
    this.store.select(getLanguages).pipe(take(1))
      .subscribe((data: StateLanguages) => this.setLanguagesInfo(data));
  }

  private setLanguagesInfo(data: StateLanguages): void {
    this.deviceLanguage = data.device;
    this.languageService.setLanguageInTranslate(data.user);
    this.languageService.setLanguageInStore(data.user, 'user');
    this.languagesInfo = APP_CONSTANTS.AVAILABLE_LANGUAGES.map(item => ({
      code: item,
      selected: item === data.user
    }));
  }
}

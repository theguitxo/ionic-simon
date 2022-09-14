import { Component, OnDestroy, OnInit } from "@angular/core";
import { ConfigLanguageItem, StateLanguages } from "../../models/app.models";
import * as CONSTANTS from '../../models/app.constants';
import { StoreState } from "../../store/store.state";
import { Store } from "@ngrx/store";
import { getLanguages } from "../../store/store.selectors";
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
    private readonly store: Store<StoreState>,
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
    this.languagesInfo = CONSTANTS.AVAILABLE_LANGUAGES.map(item => ({
      code: item,
      selected: item === data.user
    }));
  }
}

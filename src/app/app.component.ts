import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppToastOptions } from './models/app.models';
import { resetToast, setLanguage } from './store/store.actions';
import { getToastOptions } from './store/store.selectors';
import { StoreState } from './store/store.state';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service';
import { APP_LANGUAGE_KEY, DEFAULT_APP_LANGUAGE } from './models/app.constants';
import { Router } from '@angular/router';
import { LanguageService } from './services/language.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  appIsReady$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private readonly store: Store<StoreState>,
    public toastController: ToastController,
    private readonly translate: TranslateService,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initSubscriptions(): void {
    this.subscriptions.add(
      this.store.select(getToastOptions).subscribe((data: AppToastOptions) => {
        if (data.showToast) {
          this.showToast(data.toastMessage, data.toastDuration);
        }
      })
    );

    this.subscriptions.add(
      this.storageService.storageReady$.subscribe((ready: boolean) => {
        if (ready) {
          this.getLanguageValues();
        }
      })
    );
  }

  private getLanguageValues(): void {
    Promise.all([
      this.languageService.getDeviceLanguage(),
      this.languageService.getLanguageFromStorage()
    ]).then(([deviceLanguage, storageLanguage]) => {
      this.setAppLanguage(deviceLanguage, storageLanguage);
    });
  }

  private setAppLanguage(deviceLanguage: string, storageLanguage: string): void {
    this.languageService.setLanguageInStore(deviceLanguage, 'device');
    this.languageService.setLanguageInStore(storageLanguage ?? deviceLanguage, 'user');

    this.languageService.setLanguageInTranslate(storageLanguage ?? deviceLanguage);

    this.languageService.setLanguageInStorage(storageLanguage ?? deviceLanguage)
      .then(() => {
        this.setAppIsReady();
      });
  }

  private setAppIsReady(): void {
    this.appIsReady$.next(true);
    this.appIsReady$.complete();

    this.router.navigate(['/home']);
  }

  private async showToast(message: string, duration: number): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration
    });
    toast.present();
    this.store.dispatch(resetToast());
  }
}

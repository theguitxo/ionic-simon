import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppAlertOptions, AppToastOptions } from './models/app.models';
import { resetToast } from './store/store.actions';
import { StoreState } from './store/store.state';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import * as APP_ACTIONS from './store/store.actions';
import * as PLAYERS_ACTIONS from './store/players/players.actions';
import * as SCORES_ACTIONS from './store/scores/scores.actions';
import * as APP_SELECTORS from './store/store.selectors';
import { TranslateService } from '@ngx-translate/core';

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
    private readonly alertController: AlertController,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initSubscriptions(): void {
    this.subscriptions.add(
      this.store.select(APP_SELECTORS.getToastOptions).subscribe((data: AppToastOptions) => {
        if (data.showToast) {
          this.showToast(data.toastMessage, data.toastDuration);
        }
      })
    );

    this.subscriptions.add(
      this.store.select(APP_SELECTORS.getAlertOptions).subscribe((data: AppAlertOptions) => {
        if (data.showAlert) {
          this.showAlert(data.text);
        }
      })
    );

    this.subscriptions.add(
      this.storageService.storageReady$.subscribe((ready: boolean) => {
        if (ready) {
          this.store.dispatch(APP_ACTIONS.initLanguages());
          this.store.dispatch(PLAYERS_ACTIONS.getPlayersStorage());
          this.store.dispatch(SCORES_ACTIONS.getScoresStorage());
        }
      })
    );

    this.subscriptions.add(
      this.store.select(APP_SELECTORS.getItemsAreReady).subscribe((ready: boolean) => {
        if (ready) {
          this.appIsReady$.next(true);
          this.appIsReady$.complete();
          this.router.navigate(['/home']);
        }
      })
    );
    
    this.subscriptions.add(
      this.store.select(APP_SELECTORS.getRedirectTo).subscribe((route) => {
        if (route) {
          this.router.navigate([route]);
          this.store.dispatch(APP_ACTIONS.setRedirectTo({route: ''}));
        }
      })
    );
  }

  private async showToast(message: string, duration: number): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration
    });
    toast.present();
    this.store.dispatch(resetToast());
  }

  private async showAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      message,
      buttons: [
        {
          text: this.translate.instant('buttons.ok'),
          role: 'confirm',
          handler: () => {
            this.store.dispatch(APP_ACTIONS.resetAlert());
            this.store.dispatch(APP_ACTIONS.setRedirectTo({
              route: '/home'
            }));
          }
        }
      ]
    });

    await alert.present();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core'; 
import { ActionSheetController, AlertButton, AlertController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { AppState } from './store/app/app.state';
import * as APP_MODELS from './models/app/app.models';
import * as APP_ACTIONS from './store/app/app.actions';
import * as APP_SELECTORS from './store/app/app.selectors';
import * as PLAYERS_ACTIONS from './store/players/players.actions';
import * as SCORES_ACTIONS from './store/scores/scores.actions';
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
    private readonly store: Store<AppState>,
    public toastController: ToastController,
    private readonly alertController: AlertController,
    private readonly actionSheetCtrl: ActionSheetController,
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
      this.store.select(APP_SELECTORS.getToastOptions).subscribe((data: APP_MODELS.AppToastOptions) => {
        if (data.showToast) {
          this.showToast(data.toastMessage, data.toastDuration);
        }
      })
    );

    this.subscriptions.add(
      this.store.select(APP_SELECTORS.getAlertOptions).subscribe((data: APP_MODELS.AppAlertOptions) => {
        if (data.showAlert) {
          this.showAlert(data);
        }
      })
    );

    this.subscriptions.add(
      this.store.select(APP_SELECTORS.getActionSheetOptions).subscribe((options) => {
        if (options.showActionSheet) {
          this.showAlertSheet(options);
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
    this.store.dispatch(APP_ACTIONS.resetToast());
  }

  private async showAlert(data: APP_MODELS.AppAlertOptions): Promise<void> {
    const buttons: AlertButton[] = [];
    if (data.showAccept) {
      buttons.push({
        text: data.AcceptText,
        role: 'confirm',
        handler: () => {
          data.additionalAcceptActions?.forEach(action => this.store.dispatch(action));
          if (data.resetOnClose) {
            this.store.dispatch(APP_ACTIONS.resetAlert());
          }
          if (data.redirectOnAccept) {
            this.store.dispatch(APP_ACTIONS.setRedirectTo({
              route: '/home'
            }));
          }
        }
      });
    }
    if (data.showCancel) {
      buttons.push({
        text: data.CancelText,
        role: 'cancel',
        handler: () => {
          data.additionalCancelActions?.forEach(action => this.store.dispatch(action));
          if (data.resetOnClose) {
            this.store.dispatch(APP_ACTIONS.resetAlert());
          }
          if (data.redirectOnCancel) {
            this.store.dispatch(APP_ACTIONS.setRedirectTo({
              route: '/home'
            }));
          }
        }
      });
    }
    const alert = await this.alertController.create({
      message: data.text,
      buttons,
      backdropDismiss: false
    });

    await alert.present();
  }

  private async showAlertSheet(options: APP_MODELS.AppActionSheetOptions): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: options.header,
      subHeader: options.subHeader,
      buttons: options.buttons?.map((button: APP_MODELS.AppActionSheetButton) => {
        return {
          text: button.text,
          role: 'option-button',
          data: {
            actions: button.actions,
            confirm: button.confirm
          }
        }
      })
    });

    actionSheet.onDidDismiss().then((response: OverlayEventDetail<APP_MODELS.AppActionSheetResponse>) => {
      if (response.data?.confirm?.useConfirm) {
        const confirmData = response.data.confirm;

        this.store.dispatch(APP_ACTIONS.showAlert({
          options: {
            showAlert: true,
            text: confirmData.confirmText,
            showAccept: true,
            AcceptText: confirmData.acceptText ?? this.translate.instant('buttons.yes'),
            redirectOnAccept: confirmData.redirectOnConfirm,
            additionalAcceptActions: response.data.actions,
            showCancel: true,
            CancelText: confirmData.cancelText ?? this.translate.instant('buttons.no'),
            redirectOnCancel: confirmData.redirectOnCancel
          }
        }))
      } else {
        response.data?.actions?.forEach(action => {
          this.store.dispatch(action);
        });
      }
      
      this.store.dispatch(APP_ACTIONS.resetActionSheet());
    });

    actionSheet.present();
  }
}

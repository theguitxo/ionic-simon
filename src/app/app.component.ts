import { Component, OnDestroy, OnInit } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core'; 
import { ActionSheetController, AlertButton, AlertController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { AppState } from './store/app/app.state';
import * as APP_MODELS from './models/app/app.models';
import * as APP_CONSTANTS from './models/app/app.constants';
import * as APP_ACTIONS from './store/app/app.actions';
import * as APP_SELECTORS from './store/app/app.selectors';
import * as PLAYERS_ACTIONS from './store/players/players.actions';
import * as PLAYERS_SELECTORS from './store/players/players.selectors';
import * as SCORES_ACTIONS from './store/scores/scores.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * EN: Subscription to add to it the app subscriptions.
   * 
   * ES: Suscripción para agregarle las suscripciones de la aplicación.
   */
  subscriptions: Subscription = new Subscription();
  /**
   * 
   */
  appIsReady$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * EN: Constructor for the component
   * 
   * ES: Constructor para el componente
   * @param {Store<AppState>} store EN: Reference to the store (NgRx) of the app. / ES: Referencia a la store (NgRx) de la aplicación.
   * @param {ToastController} toastController EN: Controller to manage messages that are shown for a short time. / ES: Controlador para gestionar los mensajes que se muestran durante un tiempo breve.
   * @param {AlertController} alertController EN: Controller to manage messages that are shown in a pop-up. / ES: Controlador para administrar los mensajes que se muestran en una pop-up.
   * @param {ActionSheetController} actionSheetCtrl EN: Controller to manage an options menu shown in the bottom of the screen. / ES: Controlador para administrar un menú de opciones que se muestra en la parte inferior de la pantalla.
   * @param {StorageService} storageService EN: Service to communicate with the local storage of the device. / ES: Servicio de comunicación con el almacenamiento local del dispositivo.
   * @param {Router} router EN: Service of Angular to manage the application routes. / ES: Servicio de Angular para gestionar las rutas de la aplicación.
   * @param {TranslateService} translate EN: Service of Angular to manage the translations. / ES: Servicio de Angular para gestionar las traducciones.
   */
  constructor(
    private readonly store: Store<AppState>,
    public toastController: ToastController,
    private readonly alertController: AlertController,
    private readonly actionSheetCtrl: ActionSheetController,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly translate: TranslateService
  ) {}

  /**
   * EN: Angular lifecycle: inits the subscriptions needed by the application.
   * 
   * ES: Ciclo de vida de Angular: inicia las suscripciones que necesita la aplicación.
   */
  ngOnInit(): void {
    this.initSubscriptions();
  }

  /**
   * EN: Angular lifecycle: remove the subscriptions of the application started in the component initialization.
   * 
   * ES: Ciclo de vida angular: eliminar las suscripciones de la aplicación iniciadas en la inicialización del componente.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * EN: Inits all the subscriptions needed for the app.
   * 
   * ES: Inicia todas las suscripciones necesarias para la aplicación.
   */
  private initSubscriptions(): void {
    this.subscriptions.add(
      this.store.select(PLAYERS_SELECTORS.getAvatarsListReady).subscribe((value: boolean) => {
        if (value) {
          this.store.dispatch(APP_ACTIONS.initItemReady({
            key: APP_CONSTANTS.APP_PLAYERS_AVATARS_LIST
          }));
        }
      })
    );

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
          this.store.dispatch(PLAYERS_ACTIONS.createAvatarsList());
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

  /**
   * EN: Shows a little message on the bottom of the page.
   * 
   * ES: Muestra un pequeño mensaje en la parte inferior de la página.
   * @param {string} message EN: Message to display. / ES: Mensaje para mostrar.
   * @param {number} duration EN: Time in which the message should be displayed. / ES: Tiempo en que se debe mostrar el mensaje.
   */
  private async showToast(message: string, duration: number): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration
    });
    toast.present();
    this.store.dispatch(APP_ACTIONS.resetToast());
  }

  /**
   * EN: Shows a pop-up with a message and one or two option buttons.
   * 
   * ES: Muestra un pop-up con un mensaje y un o dos botones de opciones.
   * @param {AppAlertOptions} data EN: An object with the options to create the pop-up. / ES: Un objeto con las opciones para crear el pop-up.
   */
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

  /**
   * EN: Shows, from de the bottom of the screen, a options menu.
   * 
   * ES: Muestra, desde la parte inferior de la pantalla, un menú de opciones.
   * @param {AppActionSheetOptions} options EN: An object with the properties to create the menu. / ES: Un objeto con las propiedades para crear el menú.
   */
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

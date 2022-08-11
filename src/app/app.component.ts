import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppToastOptions } from './models/app.models';
import { resetToast, setLanguage } from './store/store.actions';
import { getToastOptions } from './store/store.selectors';
import { StoreState } from './store/store.state';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];

  constructor(
    private readonly store: Store<StoreState>,
    public toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(getToastOptions).subscribe((data: AppToastOptions) => {
        if (data.showToast) {
          this.showToast(data.toastMessage, data.toastDuration);
        }
      })
    );

    this.setDeviceLanguage();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  async setDeviceLanguage() {
    const info = await Device.getLanguageCode();

    if (info?.value) {
      this.store.dispatch(setLanguage({
        infoType: 'both',
        value: info?.value
      }));
    }
    console.log(info?.value);
  }

  async showToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message,
      duration
    });
    toast.present();
    this.store.dispatch(resetToast());
  }
}

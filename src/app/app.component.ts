import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppToastOptions } from './models/app.models';
import { resetToast } from './store/store.actions';
import { getItemsAreReady, getToastOptions } from './store/store.selectors';
import { StoreState } from './store/store.state';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import * as STORE_ACTIONS from './store/store.actions';
import * as PLAYERS_ACTIONS from './store/players/players.actions';

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
    private readonly storageService: StorageService,
    private readonly router: Router
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
          this.store.dispatch(STORE_ACTIONS.initLanguages());
          this.store.dispatch(PLAYERS_ACTIONS.getPlayersStorage());
        }
      })
    );

    this.subscriptions.add(
      this.store.select(getItemsAreReady).subscribe((ready: boolean) => {
        if (ready) {
          this.appIsReady$.next(true);
          this.appIsReady$.complete();
          this.router.navigate(['/home']);
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
}

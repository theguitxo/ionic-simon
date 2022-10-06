import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { playersReducer } from './store/players/players.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlayersEffects } from './store/players/players.effects';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './services/storage.service';
import { Drivers } from '@ionic/storage';
import { LanguageService } from './services/language.service';
import { scoresReducer } from './store/scores/scores.reducer';
import { ScoresEffects } from './store/scores/scores.effects';
import { gameReducer } from './store/game/game.reducers';
import { appReducer } from './store/app/app.reducer';
import { AppEffects } from './store/app/app.effects';

import '@angular/common/locales/global/es';
import '@angular/common/locales/global/en';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({
      router: routerReducer,
      players: playersReducer,
      scores: scoresReducer,
      app: appReducer,
      game: gameReducer
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production,
      autoPause: true
    }),
    EffectsModule.forRoot([
      AppEffects,
      PlayersEffects,
      ScoresEffects
    ]),
    IonicStorageModule.forRoot({
      name: '__simonData',
      driverOrder:  [Drivers.IndexedDB, Drivers.LocalStorage]
    })
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    StorageService,
    LanguageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

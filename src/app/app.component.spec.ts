import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { getAvatarsListReady } from './store/players/players.selectors';
import { getItemsAreReady } from './store/app/app.selectors';
import { TranslateServiceStub } from '../test/shared';
import { IonicModule } from '@ionic/angular';

class MockStorageService {
  get storageReady$() {
    return of(true);
  }
};

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

  const initialState = {};

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: StorageService,
          useClass: MockStorageService
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceStub
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
    }).compileComponents();

  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);

    store.overrideSelector(getAvatarsListReady, true);
    store.overrideSelector(getItemsAreReady, true);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});

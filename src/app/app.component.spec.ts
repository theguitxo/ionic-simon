import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { getAvatarsListReady } from './store/players/players.selectors';
import { getItemsAreReady } from './store/app/app.selectors';
import { StorageServiceMock, TranslateServiceStub } from '../test/shared';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

  const initialState = {};

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: StorageService,
          useClass: StorageServiceMock
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceStub
        },
        {
          provide: ActivatedRoute,
          useValue: {}
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

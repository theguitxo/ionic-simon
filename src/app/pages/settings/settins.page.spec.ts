import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SettingsPage } from './settings.page';
import { StorageService } from '../../services/storage.service';
import { MockStorageService, MockTranslatePipe, TranslateServiceStub } from '../../../test/shared';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;
  let store: MockStore;

  beforeEach(() => {
    class StoreMock {
      select = jasmine.createSpy().and.returnValue(of({}));
      dispatch = jasmine.createSpy();
      pipe = jasmine.createSpy().and.returnValue(of('success'));
    }

    class MockLanguageService {
      setLanguageInStorage(_lang) {}
      setLanguageInTranslate(_lang) {}
      setLanguageInStore(_lang, _type) {}
    }

    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot()
      ],
      declarations: [
        SettingsPage,
        MockTranslatePipe
      ],
      providers: [
        provideMockStore({}),
        {
          provide: Store,
          useClass: StoreMock
        },
        {
          provide: StorageService,
          useClass: MockStorageService
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceStub
        },
        {
          provide: LanguageService,
          useClass: MockLanguageService
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    component.languagesInfo = [];
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should call method to save new language in storage on change it', () => {
    const languageServiceSpy = spyOn(component['languageService'], 'setLanguageInStorage').and.returnValue(Promise.resolve());

    component.changeLanguage('es');

    fixture.detectChanges();

    expect(languageServiceSpy).toHaveBeenCalled();
  });
});
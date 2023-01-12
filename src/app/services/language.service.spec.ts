import { TestBed } from "@angular/core/testing";
import { LanguageService } from "./language.service";
import { StorageService } from "./storage.service";
import { StorageServiceMock, TranslateServiceStub, mockStorageLanguage } from "../../test/shared";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TranslateService } from "@ngx-translate/core";
import { Device } from "@capacitor/device";
import { APP_LANGUAGE_KEY, languageTypeInfo } from "../models/app/app.constants";
import { setLanguage } from "../store/app/app.actions";

describe('LanguageService', () => {
  let service: LanguageService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({}),
        {
          provide: StorageService,
          useClass: StorageServiceMock
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceStub
        }
      ]
    });
    store = TestBed.inject(MockStore);
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the device language', (done) => {
    Device.getLanguageCode()
      .then((info) => {
        const expected = info.value;
        service.getDeviceLanguage()
          .then((result) => {
            expect(result).toBe(expected);
            done();
          });
      });
  });

  it('should get the storage language', (done) => {
    service.getLanguageFromStorage()
      .then((value) => {
        expect(value).toBe(mockStorageLanguage);
        done();
      });
  });

  it('sould set the language in storage', (done) => {
    const storageServiceSetSpy = spyOn(service['storageService'], 'set').and.callThrough();

    service.setLanguageInStorage(mockStorageLanguage)
      .then(() => {
        expect(storageServiceSetSpy).toHaveBeenCalled();
        done();
      });
  });

  it('should set the language in store', () => {
    const language = 'es';
    const type: languageTypeInfo = 'both';

    const dispatchSpy = spyOn(store, 'dispatch');

    service.setLanguageInStore(language, type);

    expect(dispatchSpy).toHaveBeenCalledWith(setLanguage({
      value: language,
      infoType: type
    }));
  });

  it('should set language in translate service', () => {
    const language = 'es';
    const setDefaultLangSpy = spyOn(service['translate'], 'setDefaultLang');
    const useSpy = spyOn(service['translate'], 'use');

    service.setLanguageInTranslate(language);

    expect(setDefaultLangSpy).toHaveBeenCalledWith(language);
    expect(useSpy).toHaveBeenCalledWith(language);
  })
});

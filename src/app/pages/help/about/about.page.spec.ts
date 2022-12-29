import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AboutPage } from "./about.page";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TranslateServiceStub } from "../../../../test/shared";
import { By } from "@angular/platform-browser";
import { getUserLanguage } from "src/app/store/app/app.selectors";
import { IonicModule } from "@ionic/angular";

class InAppBrowserServiceStub{
	public create(_url: string): void { /* empty */ }
}

describe('AboutPage', () => {
  let component: AboutPage;
  let fixture: ComponentFixture<AboutPage>;
  let store: MockStore;
  let inAppBrowserService: InAppBrowser;

  const initialState = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [
        AboutPage
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: TranslateService,
          useClass: TranslateServiceStub
        },
        {
          provide: InAppBrowser,
          useClass: InAppBrowserServiceStub
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
    store.overrideSelector(getUserLanguage, 'es');

    inAppBrowserService = TestBed.inject(InAppBrowser);

    fixture = TestBed.createComponent(AboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should call openUrl on click in ion-button for links', () => {
    const spyOnOpenUrl = spyOn(component, 'openUrl');
    const button = fixture.debugElement.query(By.css('ion-button'));
    button.nativeElement.click();

    expect(spyOnOpenUrl).toHaveBeenCalled();
  });

  it('should call create method of InAppBrowser service on clik in ion-button for links', () => {
    const spyOnInAppBrowserCreate = spyOn(inAppBrowserService, 'create');
    const button = fixture.debugElement.query(By.css('ion-button'));
    button.nativeElement.click();

    expect(spyOnInAppBrowserCreate).toHaveBeenCalledWith(component.links[0].url);
  });
});

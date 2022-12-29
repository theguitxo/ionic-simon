import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HowPlayPage } from "./how-play.page";
import { TranslateService } from "@ngx-translate/core";
import { TranslateServiceStub } from "../../../../test/shared";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { IonicModule } from "@ionic/angular";

describe('HowPlayPage', () => {
  let component: HowPlayPage;
  let fixture: ComponentFixture<HowPlayPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [
        HowPlayPage
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceStub
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowPlayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });
});

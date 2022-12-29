import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HelpPage } from './help.page';
import { TranslateService } from '@ngx-translate/core';
import { MockTranslatePipe, TranslateServiceStub } from '../../../test/shared';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('HelpPage', () => {
  let component: HelpPage;
  let fixture: ComponentFixture<HelpPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelpPage,
        MockTranslatePipe
      ],
      imports: [IonicModule.forRoot()],
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

    fixture = TestBed.createComponent(HelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

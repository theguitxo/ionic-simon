import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonHeaderComponent } from "./common-header.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { IonicModule } from "@ionic/angular";
import { MockTranslatePipe } from "../../../test/shared";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { selectTitle } from "src/app/store/router.selectors";
import { of } from "rxjs";

describe('CommonHeaderComponent', () => {
  let component: CommonHeaderComponent;
  let fixture: ComponentFixture<CommonHeaderComponent>;
  let store: MockStore;
  let selectSpy;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [
        CommonHeaderComponent,
        MockTranslatePipe
      ],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            {
              selector: selectTitle,
              value: 'titleTest'
            }
          ]
        })
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    selectSpy = spyOn(store, 'select');
    fixture = TestBed.createComponent(CommonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should title must be the value from the selector', () => {
    expect(selectSpy).toHaveBeenCalledWith(selectTitle);
  });
});

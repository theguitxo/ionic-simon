import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { provideMockStore } from '@ngrx/store/testing';
import { MockTranslatePipe } from 'src/test/shared';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const initialState = {};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage,
        MockTranslatePipe
      ],
      imports: [IonicModule.forRoot()],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

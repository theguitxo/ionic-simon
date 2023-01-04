import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPlayersPage } from './list-players.page'
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { MockTranslatePipe, TranslateServiceStub } from '../../../../test/shared';
import { saveCurrentPlayer } from '../../../store/players/players.actions';
import { By } from '@angular/platform-browser';
import { getPlayers } from '../../../store/players/players.selectors';

describe('ListPlayersPage', () => {
  let component: ListPlayersPage;
  let fixture: ComponentFixture<ListPlayersPage>;
  let store: MockStore;

  const initialState = {};

  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot()
      ],
      declarations: [
        ListPlayersPage,
        MockTranslatePipe
      ],
      providers: [
        provideMockStore({ initialState }),
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

  beforeEach(() =>{
    store = TestBed.inject(MockStore);
    store.overrideSelector(getPlayers, [
      {
        avatar: 1,
        avatarPath: '',
        isCurrent: false,
        id: '1',
        name: 'name1'
      },
      {
        avatar: 2,
        avatarPath: '',
        isCurrent: false,
        id: '2',
        name: 'name2'
      },
      {
        avatar: 2,
        avatarPath: '',
        isCurrent: true,
        id: '3',
        name: 'name3'
      }
    ]);

    fixture = TestBed.createComponent(ListPlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should dispath action on change current player', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.setCurrentPlayer('2');

    expect(dispatchSpy).toHaveBeenCalledWith(saveCurrentPlayer({
      currentPlayer: '2'
    }));
  });

  it('should open menu on click on button', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const button = fixture.debugElement.query(By.css('.test-open-menu'));

    button.nativeElement.click();

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalled();
  });
});

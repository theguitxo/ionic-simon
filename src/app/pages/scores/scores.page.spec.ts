import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ScoresPage } from './scores.page';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  getCurrentPlayerHasScores, getOtherPlayersHaveScores,
  getScoresCurrentPlayer, getScoresOtherPlayers
} from '../../store/scores/scores.selectors';

describe('ScoresPage', () => {
  let component: ScoresPage;
  let fixture: ComponentFixture<ScoresPage>;
  let store: MockStore;
  let selectSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot()
      ],
      declarations: [
        ScoresPage
      ],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            {
              selector: getCurrentPlayerHasScores,
              value: null
            },
            {
              selector: getOtherPlayersHaveScores,
              value: null
            },
            {
              selector: getScoresCurrentPlayer,
              value: null
            },
            {
              selector: getScoresOtherPlayers,
              value: null
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
    fixture = TestBed.createComponent(ScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should call the selectors on init', () => {
    expect(selectSpy).toHaveBeenCalledWith(getCurrentPlayerHasScores);
    expect(selectSpy).toHaveBeenCalledWith(getOtherPlayersHaveScores);
    expect(selectSpy).toHaveBeenCalledWith(getScoresCurrentPlayer);
    expect(selectSpy).toHaveBeenCalledWith(getScoresOtherPlayers);
  });
});
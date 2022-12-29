import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { GamePage } from "./game.page";
import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, tick } from "@angular/core/testing";
import { TranslateService } from "@ngx-translate/core";
import { MockTranslatePipe, TranslateServiceStub } from "../../../test/shared";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { GAME_ACTIONS, initGame, resetGameData } from "../../store/game/game.actions";
import { of } from "rxjs";
import { getContinueGame, getGameStarted } from "../../store/game/game.selectors";
import { By } from "@angular/platform-browser";
import { ACTIONS } from "../../store/app/app.actions";
import { GameState, gameInitialState } from "../../store/game/game.state";
import { IonicModule } from "@ionic/angular";

describe('GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;
  let store: MockStore;

  const initialState: GameState = gameInitialState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [
        GamePage,
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

  beforeEach(() => {
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(GamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should init subscriptons and audio events on view did enter', () => {
    const spyOnSetSubscriptions = spyOn(component as any, 'setSubscriptions').and.callThrough();
    const spyOnSetAudioEvents = spyOn(component as any, 'setAudioEvents').and.callThrough();

    component.ionViewDidEnter();

    fixture.detectChanges();

    expect(spyOnSetSubscriptions).toHaveBeenCalled();
    expect(spyOnSetAudioEvents).toHaveBeenCalled();
  });

  it('should dispatch action resetGameData on view did leave', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.subscriptions = [
      of(true).subscribe()
    ];

    component.ionViewDidLeave();

    expect(dispatchSpy).toHaveBeenCalledWith(resetGameData());
  });

  it('should start game on push button', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    store.overrideSelector(getGameStarted, false);

    fixture.detectChanges();

    const startButton = fixture.debugElement.query(By.css('.test-start-button'));

    startButton.nativeElement.click();
    
    expect(dispatchSpy).toHaveBeenCalledWith(initGame());
  });

  it('should pause and show the alert on click on stop game button', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    store.overrideSelector(getGameStarted, true);

    fixture.detectChanges();

    const stopButton = fixture.debugElement.query(By.css('.test-stop-button'));

    stopButton.nativeElement.click();

    const args = dispatchSpy.calls.allArgs();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(args[0][0].type).toEqual(GAME_ACTIONS.PAUSE_GAME);
    expect(args[1][0].type).toEqual(ACTIONS.SHOW_ALERT);
  });
  
  it('should call function to continue game when the selector for this task changes', fakeAsync(() => {
    const canContinueGameSpy = spyOn(component as any, 'canContinueGame').and.callThrough();
    const addAndPlaySequenceSpy = spyOn(component as any, 'addAndPlaySequence').and.callThrough();

    store.overrideSelector(getContinueGame, true);

    component.ionViewDidEnter();

    tick(500);

    expect(canContinueGameSpy).toHaveBeenCalled();
    expect(addAndPlaySequenceSpy).toHaveBeenCalled();

    discardPeriodicTasks();
  }));
});

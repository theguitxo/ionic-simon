import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NewPlayerPage } from './new-player.page';
import { FormBuilder } from '@angular/forms';
import { MockTranslatePipe } from 'src/test/shared';
import { newPlayer } from 'src/app/store/players/players.actions';
import { v4 as uuidv4 } from 'uuid';

describe('NewPlayerPage', () => {
  let component: NewPlayerPage;
  let fixture: ComponentFixture<NewPlayerPage>;
  let store: MockStore;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot()
      ],
      declarations: [
        NewPlayerPage,
        MockTranslatePipe
      ],
      providers: [
        provideMockStore({}),
        FormBuilder
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(NewPlayerPage);
    formBuilder = TestBed.inject(FormBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should create the list of avatars paths', () => {
    expect(component.avatarFiles.length).toBe(16);
  });

  it('should selectAvatar method must set the value', () => {
    component.selectAvatar(1);

    expect(component.avatarSelected).toBe(1);
  });

  it('should dispatch action on create new player', () => {
    spyOn(component as any, 'generateUUID').and.returnValue('test');
    const dispatchSpy = spyOn(store, 'dispatch');
    const expectedAction = newPlayer({
      player: {
        avatar: 1,
        id: 'test',
        name: ''
      }
    });

    component.createNewPlayer();

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});

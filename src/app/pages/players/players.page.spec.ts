import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersPage } from './players.page';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('PlayersPage', () => {
  let component: PlayersPage
  let fixture: ComponentFixture<PlayersPage>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot()
      ],
      declarations: [
        PlayersPage
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });
});

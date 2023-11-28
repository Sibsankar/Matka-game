import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTimingsComponent } from './game-timings.component';

describe('GameTimingsComponent', () => {
  let component: GameTimingsComponent;
  let fixture: ComponentFixture<GameTimingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTimingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

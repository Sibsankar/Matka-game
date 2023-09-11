import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcuttaMatkaComponent } from './calcutta-matka.component';

describe('CalcuttaMatkaComponent', () => {
  let component: CalcuttaMatkaComponent;
  let fixture: ComponentFixture<CalcuttaMatkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcuttaMatkaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcuttaMatkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

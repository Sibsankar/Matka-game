import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DipositHistoryComponent } from './diposit-history.component';

describe('DipositHistoryComponent', () => {
  let component: DipositHistoryComponent;
  let fixture: ComponentFixture<DipositHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DipositHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DipositHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

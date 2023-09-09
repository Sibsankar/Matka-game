import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InheaderComponent } from './inheader.component';

describe('InheaderComponent', () => {
  let component: InheaderComponent;
  let fixture: ComponentFixture<InheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

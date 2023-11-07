import { TestBed } from '@angular/core/testing';

import { CalcuttaMatkaService } from './calcutta-matka.service';

describe('CalcuttaMatkaService', () => {
  let service: CalcuttaMatkaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcuttaMatkaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

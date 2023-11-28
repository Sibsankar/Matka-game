import { TestBed } from '@angular/core/testing';

import { DipositHistoryService } from './diposit-history.service';

describe('DipositHistoryService', () => {
  let service: DipositHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DipositHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

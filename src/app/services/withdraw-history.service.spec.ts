import { TestBed } from '@angular/core/testing';

import { WithdrawHistoryService } from './withdraw-history.service';

describe('WithdrawHistoryService', () => {
  let service: WithdrawHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithdrawHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

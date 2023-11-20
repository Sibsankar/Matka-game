import { TestBed } from '@angular/core/testing';

import { WithdrawMoneyService } from './withdraw-money.service';

describe('WithdrawMoneyService', () => {
  let service: WithdrawMoneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithdrawMoneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MyBidService } from './my-bid.service';

describe('MyBidService', () => {
  let service: MyBidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyBidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

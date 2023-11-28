import { TestBed } from '@angular/core/testing';

import { GameTimingsService } from './game-timings.service';

describe('GameTimingsService', () => {
  let service: GameTimingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameTimingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

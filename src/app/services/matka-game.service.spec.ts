import { TestBed } from '@angular/core/testing';

import { MatkaGameService } from './matka-game.service';

describe('MatkaGameService', () => {
  let service: MatkaGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatkaGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

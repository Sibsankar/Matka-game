import { TestBed } from '@angular/core/testing';

import { RulesRegulationService } from './rules-regulation.service';

describe('RulesRegulationService', () => {
  let service: RulesRegulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RulesRegulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SeasonsService } from './seasons.service';

describe('SeasonService', () => {
  let service: SeasonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

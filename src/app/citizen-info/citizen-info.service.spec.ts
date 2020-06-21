import { TestBed } from '@angular/core/testing';

import { CitizenInfoService } from './citizen-info.service';

describe('CitizenInfoService', () => {
  let service: CitizenInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitizenInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

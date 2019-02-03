import { TestBed } from '@angular/core/testing';

import { SystemServiceService } from './system-service.service';

describe('SystemServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemServiceService = TestBed.get(SystemServiceService);
    expect(service).toBeTruthy();
  });
});

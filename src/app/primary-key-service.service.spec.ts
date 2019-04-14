import { TestBed } from '@angular/core/testing';

import { PrimaryKeyServiceService } from './primary-key-service.service';

describe('PrimaryKeyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrimaryKeyServiceService = TestBed.get(PrimaryKeyServiceService);
    expect(service).toBeTruthy();
  });
});

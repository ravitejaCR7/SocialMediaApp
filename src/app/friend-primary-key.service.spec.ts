import { TestBed } from '@angular/core/testing';

import { FriendPrimaryKeyService } from './friend-primary-key.service';

describe('FriendPrimaryKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendPrimaryKeyService = TestBed.get(FriendPrimaryKeyService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ChatIoServiceService } from './chat-io-service.service';

describe('ChatIoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatIoServiceService = TestBed.get(ChatIoServiceService);
    expect(service).toBeTruthy();
  });
});

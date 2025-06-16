import { TestBed } from '@angular/core/testing';

import { RequestConnectionService } from './request-connection.service';

describe('RequestConnectionService', () => {
  let service: RequestConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

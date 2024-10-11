import { TestBed } from '@angular/core/testing';

import { ClientLinksServiceService } from './client-links-service.service';

describe('ClientLinksServiceService', () => {
  let service: ClientLinksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLinksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

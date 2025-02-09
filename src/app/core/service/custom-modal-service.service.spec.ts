import { TestBed } from '@angular/core/testing';

import { CustomModalServiceService } from './custom-modal-service.service';

describe('CustomModalServiceService', () => {
  let service: CustomModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

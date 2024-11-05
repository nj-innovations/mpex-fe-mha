import { TestBed } from '@angular/core/testing';

import { AltLoginService } from './alt-login.service';

describe('AltLoginService', () => {
  let service: AltLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

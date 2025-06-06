import { TestBed } from '@angular/core/testing';

import { AlternateViewService } from './alternate-view.service';

describe('AlternateViewService', () => {
  let service: AlternateViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlternateViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

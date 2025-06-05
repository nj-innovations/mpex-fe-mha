import { TestBed } from '@angular/core/testing';

import { ViewMentorService } from './view-mentor.service';

describe('ViewMentorService', () => {
  let service: ViewMentorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewMentorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

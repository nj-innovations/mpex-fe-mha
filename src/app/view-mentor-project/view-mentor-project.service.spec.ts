import { TestBed } from '@angular/core/testing';

import { ViewMentorProjectService } from './view-mentor-project.service';

describe('ViewMentorProjectService', () => {
  let service: ViewMentorProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewMentorProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

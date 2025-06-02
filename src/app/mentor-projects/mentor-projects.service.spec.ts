import { TestBed } from '@angular/core/testing';

import { MentorProjectsService } from './mentor-projects.service';

describe('SuperAdminMentorProjectsService', () => {
  let service: MentorProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

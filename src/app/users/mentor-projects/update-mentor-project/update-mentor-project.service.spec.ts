import { TestBed } from '@angular/core/testing';

import { UpdateMentorProjectService } from './update-mentor-project.service';

describe('UpdateMentorProjectService', () => {
  let service: UpdateMentorProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateMentorProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

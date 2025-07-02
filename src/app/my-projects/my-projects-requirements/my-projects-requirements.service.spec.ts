import { TestBed } from '@angular/core/testing';

import { MyProjectsRequirementsService } from './my-projects-requirements.service';

describe('MyProjectsRequirementsService', () => {
  let service: MyProjectsRequirementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyProjectsRequirementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

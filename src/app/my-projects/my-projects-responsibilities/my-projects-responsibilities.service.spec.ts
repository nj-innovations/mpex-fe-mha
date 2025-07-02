import { TestBed } from '@angular/core/testing';

import { MyProjectsResponsibilitiesService } from './my-projects-responsibilities.service';

describe('MyProjectsResponsibilitiesService', () => {
  let service: MyProjectsResponsibilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyProjectsResponsibilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

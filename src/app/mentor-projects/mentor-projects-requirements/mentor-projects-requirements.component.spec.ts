import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorProjectsRequirementsComponent } from './mentor-projects-requirements.component';

describe('MentorProjectsRequirementsComponent', () => {
  let component: MentorProjectsRequirementsComponent;
  let fixture: ComponentFixture<MentorProjectsRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorProjectsRequirementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorProjectsRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorProjectsResponsibilitiesComponent } from './mentor-projects-responsibilities.component';

describe('MentorProjectsResponsibilitiesComponent', () => {
  let component: MentorProjectsResponsibilitiesComponent;
  let fixture: ComponentFixture<MentorProjectsResponsibilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorProjectsResponsibilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorProjectsResponsibilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

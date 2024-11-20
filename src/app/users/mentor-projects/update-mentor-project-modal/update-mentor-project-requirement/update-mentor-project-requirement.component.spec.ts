import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMentorProjectRequirementComponent } from './update-mentor-project-requirement.component';

describe('UpdateMentorProjectRequirementComponent', () => {
  let component: UpdateMentorProjectRequirementComponent;
  let fixture: ComponentFixture<UpdateMentorProjectRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMentorProjectRequirementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMentorProjectRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

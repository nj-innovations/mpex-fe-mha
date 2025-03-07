import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMyProjectsRequirementComponent } from './update-my-projects-requirement.component';

describe('UpdateMyProjectsRequirementComponent', () => {
  let component: UpdateMyProjectsRequirementComponent;
  let fixture: ComponentFixture<UpdateMyProjectsRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMyProjectsRequirementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMyProjectsRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

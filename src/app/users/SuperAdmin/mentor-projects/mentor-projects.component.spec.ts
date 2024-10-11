import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminMentorProjectsComponent } from './mentor-projects.component';

describe('SuperAdminMentorProjectsComponent', () => {
  let component: SuperAdminMentorProjectsComponent;
  let fixture: ComponentFixture<SuperAdminMentorProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAdminMentorProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperAdminMentorProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMentorProjectModalComponent } from './update-mentor-project-modal.component';

describe('UpdateMentorProjectModalComponent', () => {
  let component: UpdateMentorProjectModalComponent;
  let fixture: ComponentFixture<UpdateMentorProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMentorProjectModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMentorProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

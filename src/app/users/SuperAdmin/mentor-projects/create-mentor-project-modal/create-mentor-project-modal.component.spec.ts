import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMentorProjectModalComponent } from './create-mentor-project-modal.component';

describe('CreateMentorProjectModalComponent', () => {
  let component: CreateMentorProjectModalComponent;
  let fixture: ComponentFixture<CreateMentorProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMentorProjectModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMentorProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMentorProjectModalComponent } from './delete-mentor-project-modal.component';

describe('DeleteMentorProjectModalComponent', () => {
  let component: DeleteMentorProjectModalComponent;
  let fixture: ComponentFixture<DeleteMentorProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMentorProjectModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteMentorProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

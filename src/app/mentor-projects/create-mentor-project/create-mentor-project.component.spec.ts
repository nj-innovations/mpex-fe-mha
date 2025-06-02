import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMentorProjectComponent } from './create-mentor-project.component';

describe('CreateMentorProjectComponent', () => {
  let component: CreateMentorProjectComponent;
  let fixture: ComponentFixture<CreateMentorProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMentorProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMentorProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

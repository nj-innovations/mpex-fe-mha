import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMentorProjectComponent } from './update-mentor-project.component';

describe('UpdateMentorProjectComponent', () => {
  let component: UpdateMentorProjectComponent;
  let fixture: ComponentFixture<UpdateMentorProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMentorProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMentorProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

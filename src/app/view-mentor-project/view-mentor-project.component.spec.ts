import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMentorProjectComponent } from './view-mentor-project.component';

describe('ViewMentorProjectComponent', () => {
  let component: ViewMentorProjectComponent;
  let fixture: ComponentFixture<ViewMentorProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMentorProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMentorProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMyProjectsModalComponent } from './update-my-projects-modal.component';

describe('UpdateMyProjectsModalComponent', () => {
  let component: UpdateMyProjectsModalComponent;
  let fixture: ComponentFixture<UpdateMyProjectsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMyProjectsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMyProjectsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

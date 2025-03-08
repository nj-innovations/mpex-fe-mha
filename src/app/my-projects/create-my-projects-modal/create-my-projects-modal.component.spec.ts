import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMyProjectsModalComponent } from './create-my-projects-modal.component';

describe('CreateMyProjectsModalComponent', () => {
  let component: CreateMyProjectsModalComponent;
  let fixture: ComponentFixture<CreateMyProjectsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMyProjectsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMyProjectsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

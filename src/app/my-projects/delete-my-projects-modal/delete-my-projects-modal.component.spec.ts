import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMyProjectsModalComponent } from './delete-my-projects-modal.component';

describe('DeleteMyProjectsModalComponent', () => {
  let component: DeleteMyProjectsModalComponent;
  let fixture: ComponentFixture<DeleteMyProjectsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMyProjectsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMyProjectsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

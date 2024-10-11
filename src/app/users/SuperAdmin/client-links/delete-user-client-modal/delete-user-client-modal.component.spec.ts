import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserClientModalComponent } from './delete-user-client-modal.component';

describe('DeleteUserClientModalComponent', () => {
  let component: DeleteUserClientModalComponent;
  let fixture: ComponentFixture<DeleteUserClientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUserClientModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteUserClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

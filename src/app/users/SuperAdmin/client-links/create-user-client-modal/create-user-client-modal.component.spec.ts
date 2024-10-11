import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserClientModalComponent } from './create-user-client-modal.component';

describe('CreateUserClientModalComponent', () => {
  let component: CreateUserClientModalComponent;
  let fixture: ComponentFixture<CreateUserClientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserClientModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUserClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

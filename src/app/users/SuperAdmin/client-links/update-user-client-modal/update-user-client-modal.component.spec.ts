import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserClientModalComponent } from './update-user-client-modal.component';

describe('UpdateUserClientModalComponent', () => {
  let component: UpdateUserClientModalComponent;
  let fixture: ComponentFixture<UpdateUserClientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserClientModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateUserClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

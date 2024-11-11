import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConnectionModalComponent } from './update-connection-modal.component';

describe('UpdateConnectionModalComponent', () => {
  let component: UpdateConnectionModalComponent;
  let fixture: ComponentFixture<UpdateConnectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateConnectionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateConnectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

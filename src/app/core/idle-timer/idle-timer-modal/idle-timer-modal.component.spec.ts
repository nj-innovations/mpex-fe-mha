import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleTimerModalComponent } from './idle-timer-modal.component';

describe('IdleTimerModalComponent', () => {
  let component: IdleTimerModalComponent;
  let fixture: ComponentFixture<IdleTimerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdleTimerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdleTimerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

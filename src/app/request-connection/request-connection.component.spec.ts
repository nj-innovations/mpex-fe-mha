import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestConnectionComponent } from './request-connection.component';

describe('RequestConnectionComponent', () => {
  let component: RequestConnectionComponent;
  let fixture: ComponentFixture<RequestConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestConnectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

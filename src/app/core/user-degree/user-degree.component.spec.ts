import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDegreeComponent } from './user-degree.component';

describe('UserDegreeComponent', () => {
  let component: UserDegreeComponent;
  let fixture: ComponentFixture<UserDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDegreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

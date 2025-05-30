import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectsCreateComponent } from './my-projects-create.component';

describe('MyProjectsCreateComponent', () => {
  let component: MyProjectsCreateComponent;
  let fixture: ComponentFixture<MyProjectsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProjectsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProjectsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

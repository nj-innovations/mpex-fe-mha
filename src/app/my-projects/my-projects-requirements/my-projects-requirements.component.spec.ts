import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectsRequirementsComponent } from './my-projects-requirements.component';

describe('MyProjectsRequirementsComponent', () => {
  let component: MyProjectsRequirementsComponent;
  let fixture: ComponentFixture<MyProjectsRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProjectsRequirementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProjectsRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

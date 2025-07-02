import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectsResponsibilitiesComponent } from './my-projects-responsibilities.component';

describe('MyProjectsResponsibilitiesComponent', () => {
  let component: MyProjectsResponsibilitiesComponent;
  let fixture: ComponentFixture<MyProjectsResponsibilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProjectsResponsibilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProjectsResponsibilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectsUpdateComponent } from './my-projects-update.component';

describe('MyProjectsUpdateComponent', () => {
  let component: MyProjectsUpdateComponent;
  let fixture: ComponentFixture<MyProjectsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProjectsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProjectsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

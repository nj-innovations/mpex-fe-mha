import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMentorModalComponent } from './search-mentor-modal.component';

describe('SearchMentorModalComponent', () => {
  let component: SearchMentorModalComponent;
  let fixture: ComponentFixture<SearchMentorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMentorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchMentorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

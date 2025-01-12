import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPostsListComponent } from './approved-posts-list.component';

describe('ApprovedPostsListComponent', () => {
  let component: ApprovedPostsListComponent;
  let fixture: ComponentFixture<ApprovedPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedPostsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

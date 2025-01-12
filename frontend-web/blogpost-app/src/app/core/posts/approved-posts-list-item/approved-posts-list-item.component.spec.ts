import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPostsListItemComponent } from './approved-posts-list-item.component';

describe('ApprovedPostsListItemComponent', () => {
  let component: ApprovedPostsListItemComponent;
  let fixture: ComponentFixture<ApprovedPostsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedPostsListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPostsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

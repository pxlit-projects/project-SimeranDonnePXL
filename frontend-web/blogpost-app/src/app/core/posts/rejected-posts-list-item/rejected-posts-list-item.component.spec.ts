import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedPostsListItemComponent } from './rejected-posts-list-item.component';

describe('RejectedPostsListItemComponent', () => {
  let component: RejectedPostsListItemComponent;
  let fixture: ComponentFixture<RejectedPostsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedPostsListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedPostsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

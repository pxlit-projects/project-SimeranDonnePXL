import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedPostsListComponent } from './rejected-posts-list.component';

describe('RejectedPostsListComponent', () => {
  let component: RejectedPostsListComponent;
  let fixture: ComponentFixture<RejectedPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedPostsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

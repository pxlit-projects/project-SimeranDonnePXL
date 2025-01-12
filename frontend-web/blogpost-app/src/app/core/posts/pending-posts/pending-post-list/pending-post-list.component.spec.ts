import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPostListComponent } from './pending-post-list.component';

describe('PendingPostListComponent', () => {
  let component: PendingPostListComponent;
  let fixture: ComponentFixture<PendingPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingPostListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPostItemComponent } from './pending-post-item.component';

describe('PendingPostItemComponent', () => {
  let component: PendingPostItemComponent;
  let fixture: ComponentFixture<PendingPostItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingPostItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingPostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

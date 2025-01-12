import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptStatusItemComponent } from './concept-status-item.component';

describe('ConceptStatusItemComponent', () => {
  let component: ConceptStatusItemComponent;
  let fixture: ComponentFixture<ConceptStatusItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptStatusItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptStatusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

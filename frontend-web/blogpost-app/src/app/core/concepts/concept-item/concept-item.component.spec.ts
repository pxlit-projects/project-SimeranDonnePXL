import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptItemComponent } from './concept-item.component';

describe('ConceptItemComponent', () => {
  let component: ConceptItemComponent;
  let fixture: ComponentFixture<ConceptItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Occasion } from './occasion';

describe('Occasion', () => {
  let component: Occasion;
  let fixture: ComponentFixture<Occasion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Occasion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Occasion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

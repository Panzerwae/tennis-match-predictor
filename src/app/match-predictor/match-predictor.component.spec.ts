import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPredictorComponent } from './match-predictor.component';

describe('MatchPredictorComponent', () => {
  let component: MatchPredictorComponent;
  let fixture: ComponentFixture<MatchPredictorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchPredictorComponent]
    });
    fixture = TestBed.createComponent(MatchPredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

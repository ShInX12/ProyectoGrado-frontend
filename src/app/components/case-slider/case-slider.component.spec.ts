import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSliderComponent } from './case-slider.component';

describe('CaseSliderComponent', () => {
  let component: CaseSliderComponent;
  let fixture: ComponentFixture<CaseSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

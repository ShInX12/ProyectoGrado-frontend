import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationsBoxComponent } from './observations-box.component';

describe('ObservationsBoxComponent', () => {
  let component: ObservationsBoxComponent;
  let fixture: ComponentFixture<ObservationsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

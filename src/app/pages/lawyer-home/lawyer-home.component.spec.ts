import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerHomeComponent } from './lawyer-home.component';

describe('HomeComponent', () => {
  let component: LawyerHomeComponent;
  let fixture: ComponentFixture<LawyerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawyerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeClientListComponent } from './home-client-list.component';

describe('ClientListComponent', () => {
  let component: HomeClientListComponent;
  let fixture: ComponentFixture<HomeClientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeClientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

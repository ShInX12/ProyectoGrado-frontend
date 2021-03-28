import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserDetailsComponent } from './register-user-details.component';

describe('RegisterUserDetailComponent', () => {
  let component: RegisterUserDetailsComponent;
  let fixture: ComponentFixture<RegisterUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RegisterStepperService } from './register-stepper.service';

describe('RegisterStepperService', () => {
  let service: RegisterStepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterStepperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

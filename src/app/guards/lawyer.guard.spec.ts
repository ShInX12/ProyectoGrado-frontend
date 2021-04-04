import { TestBed } from '@angular/core/testing';

import { LawyerGuard } from './lawyer.guard';

describe('LawyerGuard', () => {
  let guard: LawyerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LawyerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PersonalIdTypeService } from './personal-id-type.service';

describe('PersonalIdTypesService', () => {
  let service: PersonalIdTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalIdTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

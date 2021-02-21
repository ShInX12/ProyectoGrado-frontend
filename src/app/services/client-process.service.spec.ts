import { TestBed } from '@angular/core/testing';

import { ClientProcessService } from './client-process.service';

describe('ClientProcessService', () => {
  let service: ClientProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

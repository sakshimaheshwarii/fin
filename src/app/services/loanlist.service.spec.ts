import { TestBed } from '@angular/core/testing';

import { LoanlistService } from './loanlist.service';

describe('LoanlistService', () => {
  let service: LoanlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

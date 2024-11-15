import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanrequestsComponent } from './loanrequests.component';

describe('LoanrequestsComponent', () => {
  let component: LoanrequestsComponent;
  let fixture: ComponentFixture<LoanrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanrequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

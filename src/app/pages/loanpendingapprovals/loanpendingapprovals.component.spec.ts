import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanpendingapprovalsComponent } from './loanpendingapprovals.component';

describe('LoanpendingapprovalsComponent', () => {
  let component: LoanpendingapprovalsComponent;
  let fixture: ComponentFixture<LoanpendingapprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanpendingapprovalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanpendingapprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Loan } from '../models/loan.model';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  getApprovedLoans() {
    throw new Error('Method not implemented.');
  }
  private loans: Loan[] = [
    {
      id: 1, amount: 5000, borrower: 'Alice', status: 'pending',
      interestRate: 4
    },
    {
      id: 2, amount: 10000, borrower: 'Bob', status: 'pending',
      interestRate: 6
    },
  ];

  private loansSubject = new BehaviorSubject<Loan[]>(this.loans);
  loans$ = this.loansSubject.asObservable();
  currentRole: string | undefined ;

  approveLoan(loanId: number) {
    const loan = this.loans.find((l) => l.id === loanId);
    if (loan) {
      loan.status = 'approved';
      this.loansSubject.next([...this.loans]);
    }
  }
}

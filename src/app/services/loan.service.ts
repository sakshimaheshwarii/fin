// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// // -------------------


// // src/app/services/loan.service.ts
// import { Loan } from '../models/loan.model'; // Import your Loan model



// // -------------------
// @Injectable({
//   providedIn: 'root',
// })
// export class LoanService {
//   router: any;
//   currentRole: string = '';

//     private apiUrl = 'http://localhost:5433/api/loans'; // Update with your API URL


//   getApprovedLoans(): Observable<Loan[]> {
//       return this.http.get<Loan[]>(`${this.apiUrl}/approved`);
//     }

//   constructor(private http: HttpClient) {
//   }

//   createLoanApplication(): Observable<any> {
//     return this.http.post('/api/loans', {});
//   }

//   getLoanStatus(): Observable<any> {
//     return this.http.get('/api/loans/status');
//   }

//   getLoanHistory(): Observable<any[]> {
//     return this.http.get<any[]>('/api/loans/history');
//   }

//   resolveLoanIssues(): Observable<any> {
//     return this.http.post('/api/loans/issues/resolve', {});
//   }

// }


// -------------------------------------------
// loan.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Loan } from '../models/loan.model'; // Import your Loan model

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
    // ... other loans
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

import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.css']
})
export class LoanStatusComponent {
  applicationId: string = '';
  loanStatus: string | null = null;
  loanDetails: string | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private location: Location) {}

  checkStatus() {
    this.loading = true;
    this.errorMessage = null;
    this.loanStatus = null;

    setTimeout(() => {
      this.loading = false;

      if (this.applicationId === '123456') {
        this.loanStatus = 'Approved';
        this.loanDetails = 'Your loan of $10,000 is approved and will be disbursed shortly.';
      } else {
        this.errorMessage = 'Loan Application ID not found. Please check and try again.';
      }
    }, 2000);
  }

  goBack() {
    this.location.back();
  }
}

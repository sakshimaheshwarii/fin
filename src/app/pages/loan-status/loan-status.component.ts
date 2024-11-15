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

  constructor(private location: Location) {} // Injecting the Location service

  checkStatus() {
    this.loading = true;
    this.errorMessage = null; // Reset error message
    this.loanStatus = null; // Reset loan status

    // Simulate an API call to check loan status
    setTimeout(() => {
      this.loading = false;

      // Simulated response
      if (this.applicationId === '123456') {
        this.loanStatus = 'Approved';
        this.loanDetails = 'Your loan of $10,000 is approved and will be disbursed shortly.';
      } else {
        this.errorMessage = 'Loan Application ID not found. Please check and try again.';
      }
    }, 2000); // Simulate a 2-second loading time
  }

  goBack() {
    // Logic to navigate back
    this.location.back(); // Navigates back to the previous page
  }
}

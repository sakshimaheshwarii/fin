import { Component } from '@angular/core';

@Component({
  selector: 'app-loanrequests',
  templateUrl: './loanrequests.component.html',
  styleUrls: ['./loanrequests.component.css']
})
export class LoanrequestsComponent {
  loanApplications = ['Loan #1234', 'Loan #5678', 'Loan #91011'];

}

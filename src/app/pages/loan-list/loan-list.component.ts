import { Component, OnInit } from '@angular/core';
import { LoanListService } from '../../services/loanlist.service'; 
import { Loan } from '../../models/loan.model';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css'],
})
export class LoanListComponent implements OnInit {
  loans: Loan[] = [];
  loading: boolean = true;

  constructor(private loanListService: LoanListService) {}

  ngOnInit(): void {
    this.fetchApprovedLoans();
  }

  fetchApprovedLoans(): void {
    this.loanListService.getApprovedLoans().subscribe(
      (data: Loan[]) => {
        this.loans = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching approved loans:', error);
        this.loading = false;
      }
    );
  }
}

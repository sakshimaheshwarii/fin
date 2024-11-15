// src/app/pages/loan-list/loan-list.component.ts
import { Component, OnInit } from '@angular/core';
import { LoanListService } from '../../services/loanlist.service';  // Make sure the path is correct
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
        this.loans = data; // Assign the fetched data to loans
        this.loading = false; // Set loading to false after data is fetched
      },
      (error) => {
        console.error('Error fetching approved loans:', error); // Log the actual error
        this.loading = false; // Set loading to false in case of error
      }
    );
  }
}

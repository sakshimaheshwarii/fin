import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-loan-history',
  templateUrl: './loan-history.component.html',
  styleUrls: ['./loan-history.component.css']
})
export class LoanHistoryComponent implements OnInit {
  loanHistory: Array<{ id: number; type: string; status: string }> = [];
  displayedColumns: string[] = ['id', 'type', 'status'];

  constructor(private location: Location, private http: HttpClient) {}

  ngOnInit() {
    this.loadLoanHistory();
  }

  loadLoanHistory() {
    this.http.get<{ id: number; type: string; status: string }[]>('http://localhost:8087/api/loan-history')
      .subscribe({
        next: (data) => this.loanHistory = data,
        error: (error) => console.error('Error fetching loan history:', error)
      });
  }

  goBack() {
    this.location.back();
  }
}

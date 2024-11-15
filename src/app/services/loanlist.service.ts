// src/app/services/loanlist.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';  // Import Loan type here

@Injectable({
  providedIn: 'root',
})
export class LoanListService {
  updateSettings(updatedSettings: any) {
    throw new Error('Method not implemented.');
  }
  getSettings() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8087/api/loans/approved'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getApprovedLoans(): Observable<Loan[]> {  // Use Loan[] instead of LoanList[]
    return this.http.get<Loan[]>(this.apiUrl); // GET request to fetch approved loans
  }
}

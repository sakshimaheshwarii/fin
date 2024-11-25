import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';

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
  private apiUrl = 'http://localhost:8087/api/loans/approved';

  constructor(private http: HttpClient) {}

  getApprovedLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }
}

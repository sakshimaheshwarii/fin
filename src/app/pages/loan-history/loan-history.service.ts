import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanHistoryService {
  private apiUrl = 'http://localhost:8087/api/loan-history';

  constructor(private http: HttpClient) {}

  getLoanHistory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

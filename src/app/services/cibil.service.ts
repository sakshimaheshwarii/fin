import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CibilService {
  private apiUrl = 'http://localhost:8087/api/cibil'; // Adjust the backend URL as necessary

  constructor(private http: HttpClient) {}

  sendOtp(mobileNumber: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-otp?mobileNumber=${mobileNumber}`, {});
  }

  saveCibilScore(userId: number, score: number, status: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-score`, { userId, score, status });
  }

  getUserCibilScore(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}/score`);
  }
}

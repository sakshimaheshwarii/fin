import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  private baseUrl = 'http://localhost:8087/api'; // Your backend URL

  constructor(private http: HttpClient) {}

  // Fetch admin dashboard overview data
  getAdminOverview(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/overview`);
  }}

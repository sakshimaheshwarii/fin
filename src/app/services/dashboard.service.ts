import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8087/api/dashboard/stats';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error("Error fetching dashboard stats:", error);
        return throwError(error);
      })
    );
  }
}

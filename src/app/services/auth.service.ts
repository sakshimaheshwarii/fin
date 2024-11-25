import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8087/api/auth';
  private loginStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  private registrationStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));

  constructor(private http: HttpClient) {}

  getUserId(): Observable<number> {
    return this.http.get<number>('http://localhost:8087/api/user-profile/');
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/current-user`);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  registerUser(name: string, username: string, email: string, password: string): Observable<any> {
    const registerData = { name, username, email, password };
    return this.http.post(`${this.baseUrl}/register/user`, registerData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((response: any) => {
        this.registrationStatus.next(true);
        return response;
      }),
      catchError(error => {
        console.error('User registration error:', error);
        this.registrationStatus.next(false);
        return throwError(error);
      })
    );
  }

  registerAdmin(name: string, username: string, email: string, password: string): Observable<any> {
    const registerData = { name, username, email, password };
    return this.http.post(`${this.baseUrl}/register/admin`, registerData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((response: any) => {
        this.registrationStatus.next(true);
        return response;
      }),
      catchError(error => {
        console.error('Admin registration error:', error);
        this.registrationStatus.next(false);
        return throwError(error);
      })
    );
  }

  loginUser(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.baseUrl}/login/user`, loginData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((response: any) => {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', 'user');
          this.loginStatus.next(true);
        return response;
      }),
      catchError(error => {
        console.error('User login error:', error);
        this.loginStatus.next(false);
        return throwError(error);
      })
    );
  }

  loginAdmin(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.baseUrl}/login/admin`, loginData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((response: any) => {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', 'admin');
          this.loginStatus.next(true);
        return response;
      }),
      catchError(error => {
        console.error('Admin login error:', error);
        this.loginStatus.next(false);
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.loginStatus.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  getRegistrationStatus(): Observable<boolean> {
    return this.registrationStatus.asObservable();
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}

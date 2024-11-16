import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8087/api/auth'; // Base URL for backend API
  private loginStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  private registrationStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  
  constructor(private http: HttpClient) {}
  
  getUserId(): Observable<number> {
    return this.http.get<number>('http://localhost:8087/api/user-profile/current-user-id');
  }
  
  // Register user method
  registerUser(name: string, username: string, email: string, password: string): Observable<any> {
    const registerData = { name, username, email, password };
    return this.http.post(`${this.baseUrl}/register/user`, registerData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((response: any) => {
        this.registrationStatus.next(true); // Set registration status to true on success
        return response;
      }),
      catchError(error => {
        console.error('User registration error:', error);
        this.registrationStatus.next(false); // Reset if registration fails
        return throwError(error);
      })
    );
  }

  // Register admin method
  registerAdmin(name: string, username: string, email: string, password: string): Observable<any> {
    const registerData = { name, username, email, password };
    return this.http.post(`${this.baseUrl}/register/admin`, registerData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((response: any) => {
        this.registrationStatus.next(true); // Set registration status to true on success
        return response;
      }),
      catchError(error => {
        console.error('Admin registration error:', error);
        this.registrationStatus.next(false); // Reset if registration fails
        return throwError(error);
      })
    );
  }

  // Login user method
  loginUser(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.baseUrl}/login/user`, loginData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((response: any) => {
        // if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', 'user'); // Save user role
          this.loginStatus.next(true); // Update login status
        // }
        return response;
      }),
      catchError(error => {
        console.error('User login error:', error);
        this.loginStatus.next(false); // Reset login status if login fails
        return throwError(error);
      })
    );
  }

  // Login admin method
  loginAdmin(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.baseUrl}/login/admin`, loginData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((response: any) => {
        // if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', 'admin'); // Save admin role
          this.loginStatus.next(true); // Update login status
        // }
        return response;
      }),
      catchError(error => {
        console.error('Admin login error:', error);
        this.loginStatus.next(false); // Reset login status if login fails
        return throwError(error);
      })
    );
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.loginStatus.next(false); // Update login status
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Observable for login status
  getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  // Observable for registration status
  getRegistrationStatus(): Observable<boolean> {
    return this.registrationStatus.asObservable();
  }

  // Get user role
  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Simple method to check login status
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}

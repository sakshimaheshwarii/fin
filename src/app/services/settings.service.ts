import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from '../../app/models/settings.model';  

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl = 'http://localhost:8087/api/settings';

  constructor(private http: HttpClient) {}

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(`${this.apiUrl}`);
  }

  updateSettings(settings: Settings): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}`, settings);
  }

  saveLoanParameters(paramsData: any): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/loan-parameters`, paramsData);
  }

  updateProfile(profileData: any): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/profile`, profileData);
  }
}

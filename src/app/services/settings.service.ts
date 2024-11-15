import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from '../../app/models/settings.model';  // Make sure this model is defined and imported

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl = 'http://localhost:8087/api/settings';

  constructor(private http: HttpClient) {}

  // Get the current settings
  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(`${this.apiUrl}`);
  }

  // Update the entire settings object
  updateSettings(settings: Settings): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}`, settings);
  }

  // Save loan parameters (example implementation, adjust as needed)
  saveLoanParameters(paramsData: any): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/loan-parameters`, paramsData);
  }

  // Update profile settings (example implementation, adjust as needed)
  updateProfile(profileData: any): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/profile`, profileData);
  }
}

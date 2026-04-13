import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginRequest, SignupRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) {}

  signup(payload: SignupRequest): Observable<string> {
    return this.http
      .post(`${this.authUrl}/signup`, payload, {
        responseType: 'text'
      })
      .pipe(timeout(10000));
  }

  login(payload: LoginRequest): Observable<string> {
    return this.http
      .post(`${this.authUrl}/login`, payload, {
        responseType: 'text'
      })
      .pipe(timeout(10000));
  }
   setLoggedInUser(email: string): void {
    localStorage.setItem('qm_user_email', email);
    localStorage.setItem('qm_logged_in', 'true');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('qm_logged_in') === 'true';
  }

  logout(): void {
    localStorage.removeItem('qm_logged_in');
    localStorage.removeItem('qm_user_email');
  }
}

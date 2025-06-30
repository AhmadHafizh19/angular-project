import { Login } from './../../pages/login/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private API_URL = 'https://reqres.in/api/login'

  constructor(private http: HttpClient) { }

  Login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
      'Content-Type': 'application/json',
    });
    return this.http.post(this.API_URL, { email, password }, { headers }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }
}



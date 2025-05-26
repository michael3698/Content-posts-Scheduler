import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = 'http://localhost:8000/api'; 


  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(
      () => {
        localStorage.removeItem('token'); 
      },
      error => {
        console.error('Logout error', error);
      }
    );
  }


}

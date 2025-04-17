import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwt?: string = undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      if (!isExpired) {
        this.jwt = jwt;
      } else {
        localStorage.removeItem('jwt');
      }
    }
  }

  login(username: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`${environment.apiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap({
          next: ({ access_token }) => {
            this.jwt = access_token;
            localStorage.setItem('jwt', access_token);
          },
        }),
      );
  }

  register(username: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`${environment.apiUrl}/auth/register`, {
        username,
        password,
      })
      .pipe(
        tap({
          next: ({ access_token }) => {
            this.jwt = access_token;
            localStorage.setItem('jwt', access_token);
          },
        }),
      );
  }

  logout() {
    this.jwt = undefined;
    localStorage.removeItem('jwt');
    this.router.navigate(['/auth/login']);
  }
}

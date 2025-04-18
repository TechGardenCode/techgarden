import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken?: string = undefined;
  refreshToken?: string = undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const payload = JSON.parse(atob(refreshToken.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      if (!isExpired) {
        this.refreshToken = refreshToken;
      } else {
        localStorage.removeItem('refreshToken');
      }
    }
  }

  login(username: string, password: string) {
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        `${environment.apiUrl}/auth/signin`,
        {
          username,
          password,
        },
      )
      .pipe(
        tap({
          next: ({ accessToken, refreshToken }) => {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            localStorage.setItem('refreshToken', refreshToken);
          },
        }),
      );
  }

  register(username: string, password: string) {
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        `${environment.apiUrl}/auth/signup`,
        {
          username,
          password,
        },
      )
      .pipe(
        tap({
          next: ({ accessToken, refreshToken }) => {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            localStorage.setItem('refreshToken', refreshToken);
          },
        }),
      );
  }

  refresh() {
    const refreshToken = this.refreshToken;
    this.refreshToken = undefined;
    localStorage.removeItem('refreshToken');

    return this.http
      .get<{
        accessToken: string;
        refreshToken: string;
      }>(`${environment.apiUrl}/auth/refresh`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .pipe(
        tap({
          next: ({ accessToken, refreshToken }) => {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            localStorage.setItem('refreshToken', refreshToken);
            this.router.navigate(['/']);
          },
        }),
      );
  }

  logout() {
    this.accessToken = undefined;
    this.refreshToken = undefined;
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/auth/login']);
  }
}

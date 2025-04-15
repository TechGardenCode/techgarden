import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwt?: string = undefined;

  constructor(private readonly http: HttpClient) {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.jwt = jwt;
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
}

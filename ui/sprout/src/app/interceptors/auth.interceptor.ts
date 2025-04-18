import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const accessToken = authService.accessToken;

  const authReq = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    : req;

  return next(authReq).pipe(
    tap({
      error: (err) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          if (authService.refreshToken) {
            return authService.refresh().pipe(
              switchMap(({ accessToken }) => {
                const clonedReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                });
                return next(clonedReq);
              }),
            );
          }
        }
        return router.navigate(['/auth/login']);
      },
    }),
  );
};

import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { switchMap, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

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
        return false;
      },
    }),
  );
};

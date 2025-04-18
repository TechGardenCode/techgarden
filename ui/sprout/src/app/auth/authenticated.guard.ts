import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}
  canActivate(): MaybeAsync<GuardResult> {
    if (this.authService.accessToken) {
      return true;
    } else {
      if (this.authService.refreshToken) {
        this.authService.refresh().subscribe();
        return true;
      } else {
        return this.router.createUrlTree(['/auth/login']);
      }
    }
  }
}

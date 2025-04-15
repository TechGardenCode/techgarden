import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootButton, RootInput } from '@techgarden/root-lib';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { tap } from 'rxjs';
import { ApiState } from '../../../model/api-state.type';

@Component({
  imports: [CommonModule, RootInput, ReactiveFormsModule, RootButton, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  loginState: ApiState<unknown> = {
    data: undefined,
    loading: false,
    error: undefined,
    firstLoad: true,
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    if (this.authService.jwt) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      this.loginForm.patchValue({ username: savedUsername });
    }
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const { username, password, rememberMe } = this.loginForm.value;
    if (rememberMe) {
      localStorage.setItem('username', username);
    }

    this.loginState.loading = true;
    this.loginState.firstLoad = false;
    this.loginState.data = undefined;
    this.loginForm.disable();

    this.authService
      .login(username, password)
      .pipe(
        tap({
          next: () => {
            this.loginState.loading = false;
            this.loginState.error = undefined;
            this.loginForm.reset();
            return this.router.navigate(['/']);
          },
          error: () => {
            this.loginState.loading = false;
            this.loginState.error = 'Login failed. Please try again';
            this.loginForm.enable();
          },
        }),
      )
      .subscribe();
  }
}

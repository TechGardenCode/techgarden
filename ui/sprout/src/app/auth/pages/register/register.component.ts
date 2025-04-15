import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiState } from '../../../model/api-state.type';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { RootButton, RootInput } from '@techgarden/root-lib';

@Component({
  selector: 'sprout-register',
  imports: [CommonModule, RootInput, ReactiveFormsModule, RootButton, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  registerState: ApiState<unknown> = {
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

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    const { username, password } = this.registerForm.value;

    this.registerState.loading = true;
    this.registerState.firstLoad = false;
    this.registerState.data = undefined;
    this.registerForm.disable();

    this.authService
      .register(username, password)
      .pipe(
        tap({
          next: () => {
            this.registerState.loading = false;
            this.registerState.error = undefined;
            this.registerForm.reset();
            return this.router.navigate(['/']);
          },
          error: (error) => {
            this.registerState.loading = false;
            this.registerState.error = error.error.message;
            this.registerForm.enable();
          },
        }),
      )
      .subscribe();
  }
}

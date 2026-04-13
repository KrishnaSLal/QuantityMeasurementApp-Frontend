import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef   // ✅ added
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response: string) => {
        this.loading = false;
        this.successMessage = response;
        this.errorMessage = '';

        this.authService.setLoggedInUser(this.loginForm.value.email);

        this.cd.detectChanges();   // 🔥 force UI update

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
          this.cd.detectChanges();   // 🔥 ensure navigation update
        }, 700);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.successMessage = '';
        this.errorMessage = this.getErrorMessage(error);

        this.cd.detectChanges();   // 🔥 force UI update
      }
    });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.message?.toLowerCase().includes('timeout')) {
      return 'Login request timed out. Check whether the backend server is running.';
    }

    if (error.status === 0) {
      return 'Cannot reach the backend at http://localhost:8081/api/v1. Start the backend server and try again.';
    }

    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }

    if (error.error?.message) {
      return error.error.message;
    }

    return 'Login failed. Please try again.';
  }
}
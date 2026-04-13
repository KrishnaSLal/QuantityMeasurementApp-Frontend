import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = {
      ...this.signupForm.value,
      name: this.signupForm.value.fullName
    };

    this.authService.signup(payload).subscribe({
      next: (response: string) => {
        this.loading = false;
        this.successMessage = response;
        this.errorMessage = '';
        this.cd.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/login']);
          this.cd.detectChanges();
        }, 800);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.successMessage = '';
        this.errorMessage = this.getErrorMessage(error);
        this.cd.detectChanges();
      }
    });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.message?.toLowerCase().includes('timeout')) {
      return 'Signup request timed out. Check whether the backend server is running.';
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

    return 'Signup failed. Please try again.';
  }
}
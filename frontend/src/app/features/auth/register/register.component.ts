import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  loading = signal(false);
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    aadharNo: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    const raw = this.form.getRawValue();
    const dto = { ...raw, dateOfBirth: new Date(raw.dateOfBirth).toISOString() };
    this.auth.register(dto).subscribe({
      next: () => {
        this.auth.logout();
        this.toast.success('Registration successful. Please login.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(err.error?.message ?? err.message ?? 'Registration failed');
      },
    });
  }
}

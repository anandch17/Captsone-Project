import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  loading = signal(false);
  token = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    const t = this.route.snapshot.queryParamMap.get('token');
    this.token.set(t);
  }

  onSubmit(): void {
    const t = this.token();
    if (!t || this.form.invalid) return;
    this.loading.set(true);
    this.auth.resetPassword({ token: t, newPassword: this.form.getRawValue().newPassword }).subscribe({
      next: () => {
        this.toast.success('Password reset successful. Please login.');
        this.router.navigate(['/']);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(err.error?.message ?? err.message ?? 'Reset failed');
      },
    });
  }
}

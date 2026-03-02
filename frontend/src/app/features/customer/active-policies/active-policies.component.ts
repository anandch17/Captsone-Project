import { Component, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PolicyService } from '../../../core/services/policy.service';
import { ToastService } from '../../../core/services/toast.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import type { PolicyResponseDto } from '../../../core/models/policy.model';

@Component({
  selector: 'app-active-policies',
  standalone: true,
  imports: [CardComponent, RouterLink, DatePipe, DecimalPipe],
  templateUrl: './active-policies.component.html',
})
export class ActivePoliciesComponent {
  private readonly policyService = inject(PolicyService);
  private readonly toast = inject(ToastService);

  loading = signal(true);
  policies = signal<PolicyResponseDto[]>([]);

  constructor() {
    this.load();
  }

  load(): void {
    this.policyService.getActivePolicies().subscribe({
      next: (list) => {
        this.policies.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        this.toast.error(err.error?.message ?? err.message ?? 'Failed to load');
        this.loading.set(false);
      },
    });
  }
}

import { Component, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe, SlicePipe } from '@angular/common';
import { PolicyService } from '../../../core/services/policy.service';
import { ToastService } from '../../../core/services/toast.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import type { PolicyAssignmentDto } from '../../../core/models/admin.model';

@Component({
  selector: 'app-assigned-policies',
  standalone: true,
  imports: [CardComponent, DatePipe, DecimalPipe, SlicePipe],
  templateUrl: './assigned-policies.component.html',
})
export class AssignedPoliciesComponent {
  private readonly policyService = inject(PolicyService);
  private readonly toast = inject(ToastService);

  loading = signal(true);
  approvingId = signal<number | null>(null);
  policies = signal<PolicyAssignmentDto[]>([]);

  constructor() {
    this.load();
  }

  load(): void {
    this.policyService.getAgentPendingPolicies().subscribe({
      next: (list) => {
        this.policies.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        this.toast.error(err.error?.message ?? 'Failed to load');
        this.loading.set(false);
      },
    });
  }

  approve(policyId: number): void {
    this.approvingId.set(policyId);
    this.policyService.approvePolicy(policyId).subscribe({
      next: () => {
        this.toast.success('Policy approved. Customer can now pay.');
        this.load();
        this.approvingId.set(null);
      },
      error: (err) => {
        this.toast.error(err.error?.message ?? 'Failed to approve');
        this.approvingId.set(null);
      },
    });
  }
}

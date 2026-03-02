import { Component, inject, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PolicyService } from '../../../core/services/policy.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import type { PolicyAssignmentDto } from '../../../core/models/admin.model';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CardComponent, DecimalPipe],
  templateUrl: './performance.component.html',
})
export class PerformanceComponent {
  private readonly policyService = inject(PolicyService);

  soldPolicies = signal<PolicyAssignmentDto[]>([]);
  soldCount = computed(() => this.soldPolicies().length);
  totalPremium = computed(() => this.soldPolicies().reduce((sum, p) => sum + p.premiumAmount, 0));

  constructor() {
    this.policyService.getAgentSoldPolicies().subscribe((list) => this.soldPolicies.set(list));
  }
}

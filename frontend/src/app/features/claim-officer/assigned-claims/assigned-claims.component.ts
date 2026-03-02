import { Component, inject, signal } from '@angular/core';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClaimService } from '../../../core/services/claim.service';
import { ToastService } from '../../../core/services/toast.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import type { AssignedClaimsDto } from '../../../core/models/admin.model';
import { ClaimStatus } from '../../../core/models/claim.model';

@Component({
  selector: 'app-assigned-claims',
  standalone: true,
  imports: [CardComponent, RouterLink, DecimalPipe, SlicePipe],
  templateUrl: './assigned-claims.component.html',
})
export class AssignedClaimsComponent {
  private readonly claimService = inject(ClaimService);
  private readonly toast = inject(ToastService);

  readonly ClaimStatus = ClaimStatus;
  loading = signal(true);
  claims = signal<AssignedClaimsDto[]>([]);

  constructor() {
    this.claimService.getOfficerAssignedClaims().subscribe({
      next: (list) => {
        this.claims.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        this.toast.error(err.error?.message ?? 'Failed to load');
        this.loading.set(false);
      },
    });
  }
}

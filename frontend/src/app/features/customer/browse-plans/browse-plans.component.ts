import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PlanService } from '../../../core/services/plan.service';
import { PolicyService } from '../../../core/services/policy.service';
import { ToastService } from '../../../core/services/toast.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import type { BrowsePlanDto } from '../../../core/models/policy.model';

@Component({
  selector: 'app-browse-plans',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent, DecimalPipe],
  templateUrl: './browse-plans.component.html',
})
export class BrowsePlansComponent {
  private readonly fb = inject(FormBuilder);
  private readonly planService = inject(PlanService);
  private readonly policyService = inject(PolicyService);
  private readonly toast = inject(ToastService);

  loading = signal(false);
  interestLoading = signal(false);
  searched = signal(false);
  plans = signal<BrowsePlanDto[]>([]);

  searchForm = this.fb.nonNullable.group({
    coverageType: ['', Validators.required],
    destination: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  search(): void {
    if (this.searchForm.invalid) return;
    this.loading.set(true);
    this.searched.set(true);
    const { coverageType } = this.searchForm.getRawValue();
    this.planService.browsePlans(coverageType).subscribe({
      next: (list) => {
        this.plans.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        this.toast.error(err.error?.message ?? err.message ?? 'Failed to load plans');
        this.loading.set(false);
      },
    });
  }

  expressInterest(plan: BrowsePlanDto): void {
    const { destination, startDate, endDate } = this.searchForm.getRawValue();
    this.interestLoading.set(true);
    this.policyService
      .requestPolicy({
        planId: plan.planId,
        destinationCountry: destination,
        startDate,
        endDate,
      })
      .subscribe({
        next: () => {
          this.toast.success('Interest recorded. An agent will be assigned shortly.');
          this.interestLoading.set(false);
        },
        error: (err) => {
          this.toast.error(err.error?.message ?? err.message ?? 'Failed to submit interest');
          this.interestLoading.set(false);
        },
      });
  }
}

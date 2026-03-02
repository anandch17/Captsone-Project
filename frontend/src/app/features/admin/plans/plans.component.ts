import { Component, inject, signal } from '@angular/core';
import { CommonModule, DecimalPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PlanService } from '../../../core/services/plan.service';
import { ToastService } from '../../../core/services/toast.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import type { PlanResponseDto, CreatePlanDto, CreateCoverageDto } from '../../../core/models/admin.model';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, DecimalPipe, SlicePipe, UpperCasePipe],
  templateUrl: './plans.component.html',
})
export class PlansComponent {
  private readonly fb = inject(FormBuilder);
  private readonly planService = inject(PlanService);
  private readonly toast = inject(ToastService);

  loading = signal(true);
  creating = signal(false);
  plans = signal<PlanResponseDto[]>([]);

  // Predefined coverage types for travel insurance
  readonly coverageTypes = [
    'Medical Expenses',
    'Trip Cancellation',
    'Baggage Loss',
    'Personal Accident',
    'Emergency Evacuation',
    'Loss of Passport',
    'Flight Delay',
    'Personal Liability'
  ];

  form = this.fb.nonNullable.group({
    planName: ['', Validators.required],
    planType: ['', Validators.required],
    maxCoverageAmount: [0, [Validators.required, Validators.min(0)]],
    isActive: [true],
    coverages: this.fb.array([]),
    basePrice: [100, Validators.required],
    perDayRate: [10, Validators.required],
  });

  get coverages(): FormArray {
    return this.form.get('coverages') as FormArray;
  }

  addCoverage(): void {
    const coverageGroup = this.fb.group({
      coverageName: ['', Validators.required],
      coverageAmount: [0, [Validators.required, Validators.min(0)]]
    });
    this.coverages.push(coverageGroup);
  }

  removeCoverage(index: number): void {
    this.coverages.removeAt(index);
  }

  constructor() {
    this.addCoverage(); // Start with one coverage row
    this.fetchPlans();
  }

  private fetchPlans(): void {
    this.planService.getAllPlans().subscribe({
      next: (list) => {
        this.plans.set(list);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  createPlan(): void {
    if (this.form.invalid) {
      this.toast.error('Please fill all required fields correctly.');
      return;
    }

    const raw = this.form.getRawValue();
    const dto: CreatePlanDto = {
      planName: raw.planName,
      planType: raw.planType,
      maxCoverageAmount: raw.maxCoverageAmount,
      isActive: raw.isActive,
      coverages: raw.coverages as CreateCoverageDto[],
      premiumRule: {
        basePrice: raw.basePrice,
        ageBelow30Multiplier: 1,
        ageBetween30And50Multiplier: 1.2,
        ageAbove50Multiplier: 1.5,
        perDayRate: raw.perDayRate,
      },
    };

    this.creating.set(true);
    this.planService.createPlan(dto).subscribe({
      next: () => {
        this.toast.success('Plan created successfully.');
        this.fetchPlans();
        this.form.reset({
          isActive: true,
          basePrice: 100,
          perDayRate: 10
        });
        this.coverages.clear();
        this.addCoverage();
        this.creating.set(false);
      },
      error: (err) => {
        this.toast.error(err.error?.message ?? 'Failed to create plan');
        this.creating.set(false);
      },
    });
  }

  activate(id: number): void {
    this.planService.activatePlan(id).subscribe({
      next: () => {
        this.toast.success('Plan activated');
        this.fetchPlans();
      },
      error: (err) => this.toast.error(err.error?.message ?? 'Failed'),
    });
  }

  deactivate(id: number): void {
    this.planService.deactivatePlan(id).subscribe({
      next: () => {
        this.toast.success('Plan deactivated');
        this.fetchPlans();
      },
      error: (err) => this.toast.error(err.error?.message ?? 'Failed'),
    });
  }
}

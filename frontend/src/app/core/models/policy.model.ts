/**
 * Policy DTOs - match backend TravelInsurance.Application.Dtos.PolicyDto exactly.
 */

export interface CreatePolicyRequestDto {
  planId: number;
  destinationCountry: string;
  startDate: string; // ISO date
  endDate: string;
}

export interface PolicyResponseDto {
  id: number;
  planName: string;
  startDate: string;
  endDate: string;
  premiumAmount: number;
  status: string;
}

export interface PolicyList {
  id: number;
  planName: string;
  customerName: string;
  startDate: string;
  endDate: string;
  premiumAmount: number;
  status: string;
}

export interface PaymentPendingPolicyDto {
  policyId: number;
  planName: string;
  startDate: string;
  endDate: string;
  premiumAmount: number;
}

export interface BuyPolicyResponseDto {
  policyId: number;
  paidAmount: number;
  paymentStatus: string;
  policyStatus: string;
}

export interface BrowsePlanDto {
  planId: number;
  planName: string;
  planType: string;
  maxCoverageAmount: number;
  coverageAmount: number;
}

/** Policy lifecycle status values from backend */
export const PolicyStatus = {
  Interested: 'Interested',
  PendingAgentApproval: 'PendingAgentApproval',
  PaymentPending: 'PaymentPending',
  Active: 'Active',
  Pending: 'Pending',
  Assigned: 'Assigned',
} as const;
export type PolicyStatusType = (typeof PolicyStatus)[keyof typeof PolicyStatus];

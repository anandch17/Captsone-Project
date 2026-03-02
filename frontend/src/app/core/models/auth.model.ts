/**
 * Auth DTOs - match backend TravelInsurance.Application.Dtos.AuthDto exactly.
 * Backend serializes to camelCase.
 */

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  aadharNo: string;
  dateOfBirth: string; // ISO date
}

export interface AgentCoRegisterDto {
  username: string;
  email: string;
  password: string;
  role: 'Agent' | 'ClaimOfficer';
  aadharNo: string;
  dateOfBirth: string;
  commissionRate: number | null;
}

export interface LoginDto {
  email: string;
  password: string;
  captchaToken?: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

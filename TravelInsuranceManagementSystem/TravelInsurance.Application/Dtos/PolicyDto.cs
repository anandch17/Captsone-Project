using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelInsurance.Application.Dtos
{
    public record CalculatePremiumRequestDto(
      int PlanId,
      int Age,
      int TravelDays,
      string DestinationCountry
  );

    public record CreatePolicyRequestDto(
    int PlanId,
    string DestinationCountry,
    DateTime StartDate,
    DateTime EndDate
);

    public record ApprovePolicyDto(
    int PolicyId
);

    public record PolicyResponseDto(
    int Id,
    string PlanName,
    DateTime StartDate,
    DateTime EndDate,
    decimal PremiumAmount,
    string Status
);
    public record PolicyList(
       int Id,
       string PlanName,
       string CustomerName,
       DateTime StartDate,
       DateTime EndDate,
       decimal PremiumAmount,
       string Status
   );

    public record PaymentPendingPolicyDto(
    int PolicyId,
    string PlanName,
    DateTime StartDate,
    DateTime EndDate,
    decimal PremiumAmount
);

    public record BuyPolicyResponseDto(
    int PolicyId,
    decimal PaidAmount,
    string PaymentStatus,
    string PolicyStatus
);

    public record BrowsePlanDto(
    int PlanId,
    string PlanName,
    string PlanType,
    decimal MaxCoverageAmount,
    decimal CoverageAmount
);

}

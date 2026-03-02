using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelInsurance.Application.Dtos
{
    public record RaiseClaimDto(
    int PolicyId,
    string ClaimType,
    decimal ClaimAmount,
    List<string> DocumentUrls
);

    public record ClaimWithDocumentsDto(
       int ClaimId,
       string ClaimType,
       decimal ClaimAmount,
       string Status,
       List<string> DocumentUrls
   );
    public record ClaimResponseDto(
    int ClaimId,
    string ClaimType,
    decimal ClaimAmount,
    string Status
);

    public record ReviewClaimDto(
    string Status // Approved / Rejected
);

    public record SettleClaimDto(
    decimal SettledAmount
);

}

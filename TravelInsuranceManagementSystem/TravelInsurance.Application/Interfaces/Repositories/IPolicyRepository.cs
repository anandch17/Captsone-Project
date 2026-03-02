using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelInsurance.Application.Dtos;
using TravelInsurance.Domain.Entities;

namespace TravelInsurance.Application.Interfaces.Repositories
{
    public interface IPolicyRepository
    {
        Task<Policy?> GetByIdAsync(int id);

        Task<List<Policy?>> GetByCustomerIdAsync(int customerId);

        Task<InsurancePlan?> GetByPlanId(int id);

        Task UpdatePlanAsync(InsurancePlan plan);

        Task<Policy?> GetPolicyWithDetailsAsync(int id);

        Task<IEnumerable<Policy>> GetPoliciesWithDetailsAsync();

        Task<List<PolicyResponseDto>> GetActivePoliciesAsync(int customerId);

        Task<List<PaymentPendingPolicyDto>> GetPaymentPendingPoliciesAsync(int customerId);

        Task UpdateAsync(Policy policy);

        Task<Claim?> GetClaimByIdAsync(int claimId);

        Task AddPaymentAsync(Payment payment);

        Task UpdateClaimAsync(Claim claim);

        Task AddAsync(Policy policy);

        Task SaveChangesAsync();


    }
}

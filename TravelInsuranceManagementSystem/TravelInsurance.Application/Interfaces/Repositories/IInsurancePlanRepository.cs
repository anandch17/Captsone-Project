using TravelInsurance.Application.Dtos;
using TravelInsurance.Domain.Entities;

namespace TravelInsurance.Application.Interfaces.Repositories
{
    public interface IInsurancePlanRepository
    {

        Task AddAsync(InsurancePlan plan);

        Task<InsurancePlan?> GetByIdAsync(int id);

        Task<IEnumerable<InsurancePlan>> GetAllAsync();

        Task SaveChangesAsync();

        Task UpdateAsync(InsurancePlan plan);

        Task<List<BrowsePlanDto>> BrowsePlansByCoverageAsync(string coverageType);
    }
}
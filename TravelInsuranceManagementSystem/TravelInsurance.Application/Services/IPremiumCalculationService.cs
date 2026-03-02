using TravelInsurance.Application.Dtos;
using TravelInsurance.Application.Interfaces.Repositories;
using TravelInsurance.Application.Interfaces.Services;

public class PremiumCalculationService : IPremiumCalculationService
{
    private readonly IInsurancePlanRepository _planRepository;

    public PremiumCalculationService(IInsurancePlanRepository planRepository)
    {
        _planRepository = planRepository;
    }

    public async Task<decimal> CalculatePremiumAsync(CalculatePremiumRequestDto dto)
    {
        var plan = await _planRepository.GetByIdAsync(dto.PlanId);

        if (plan == null || plan.PremiumRule == null)
            throw new Exception("Invalid Plan");

        var rule = plan.PremiumRule;

        decimal ageMultiplier = dto.Age switch
        {
            < 30 => rule.AgeBelow30Multiplier,
            >= 30 and <= 50 => rule.AgeBetween30And50Multiplier,
            _ => rule.AgeAbove50Multiplier
        };

        decimal basePremium = rule.BasePrice;
        decimal perDayCost = dto.TravelDays * rule.PerDayRate;

        decimal premium = (basePremium + perDayCost) * ageMultiplier;

        return premium;
    }
}
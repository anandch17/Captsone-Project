using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelInsurance.Domain.Entities
{
    public class PremiumRule
    {
        [Key]
        public int Id { get; set; }

        public int InsurancePlanId { get; set; }

        [ForeignKey(nameof(InsurancePlanId))]
        public InsurancePlan InsurancePlan { get; set; } = default!;

        public decimal BasePrice { get; set; }

        public decimal AgeBelow30Multiplier { get; set; }
        public decimal AgeBetween30And50Multiplier { get; set; }
        public decimal AgeAbove50Multiplier { get; set; }

        public decimal PerDayRate { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace TravelInsurance.Domain.Entities
{
    public class InsurancePlan
    {
        [Key]
        public int Id { get; set; }

        public string PolicyName { get; set; } = default!;
        public string PlanType { get; set; } = default!;
        public decimal MaxCoverageAmount { get; set; }
        public bool IsActive { get; set; } = true;

        public ICollection<Coverage> Coverages { get; set; } = new List<Coverage>();
        public PremiumRule? PremiumRule { get; set; }
        public ICollection<Policy> Policies { get; set; } = new List<Policy>();
    }
}
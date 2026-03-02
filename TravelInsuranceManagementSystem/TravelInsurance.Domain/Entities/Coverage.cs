using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelInsurance.Domain.Entities
{
    public class Coverage
    {
        [Key]
        public int Id { get; set; }

        public string CoverageType { get; set; } = default!;
        public decimal CoverageAmount { get; set; }

        public int InsurancePlanId { get; set; }

        [ForeignKey(nameof(InsurancePlanId))]
        public InsurancePlan InsurancePlan { get; set; } = default!;

        public ICollection<Policy> Policies { get; set; } = new List<Policy>();
    }
}
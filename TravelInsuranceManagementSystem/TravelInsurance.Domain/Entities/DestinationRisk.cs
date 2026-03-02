using System.ComponentModel.DataAnnotations;

namespace TravelInsurance.Domain.Entities
{
    public class DestinationRisk
    {
        [Key]
        public int Id { get; set; }

        public string Destination { get; set; } = default!;
        public decimal RiskMultiplier { get; set; }
    }
}
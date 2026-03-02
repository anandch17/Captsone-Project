using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelInsurance.Domain.Entities
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        public int PolicyId { get; set; }

        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = default!;

        [ForeignKey(nameof(PolicyId))]
        public Policy Policy { get; set; } = default!;
    }
}
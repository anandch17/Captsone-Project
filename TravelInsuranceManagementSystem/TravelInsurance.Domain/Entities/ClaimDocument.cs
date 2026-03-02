using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelInsurance.Domain.Entities
{
    public class ClaimDocument
    {
        [Key]
        public int Id { get; set; }

        public int ClaimId { get; set; }

        public string Url { get; set; } = default!;

        [ForeignKey(nameof(ClaimId))]
        public Claim Claim { get; set; } = default!;
    }
}
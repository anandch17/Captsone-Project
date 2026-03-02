using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace TravelInsurance.Domain.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string PasswordHash { get; set; } = default!;

        public string Role { get; set; } = default!; // Admin, Customer, Agent, ClaimOfficer
        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Customer fields
        public DateTime? DateOfBirth { get; set; }
        public string? AadharCardNumber { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }

        // Agent fields
        public DateTime? DateOfJoin { get; set; }
        public decimal? CommissionRate { get; set; }

        // Password reset
        public string? ResetToken { get; set; }
        public DateTime? ResetTokenExpiry { get; set; }

        // Navigation
        public ICollection<Policy> CustomerPolicies { get; set; } = new List<Policy>();
        public ICollection<Policy> AgentPolicies { get; set; } = new List<Policy>();
        public ICollection<Claim> AssignedClaims { get; set; } = new List<Claim>();
    }
}
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelInsurance.Application.Interfaces.Services;
using TravelInsurance.Domain.Entities;

namespace TravelInsurance.Infrastructure.Services
{
    public class PasswordHasherService : IPasswordHasherService
    {
        private readonly PasswordHasher<User> _hasher = new();

        public string Hash(User user, string password)
            => _hasher.HashPassword(user, password);

        public bool Verify(User user, string hash, string password)
            => _hasher.VerifyHashedPassword(user, hash, password)
               != PasswordVerificationResult.Failed;
    }
}

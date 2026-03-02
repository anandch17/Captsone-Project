using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelInsurance.Domain.Entities;

namespace TravelInsurance.Application.Interfaces.Services
{
    public interface IPasswordHasherService
    {
        string Hash(User user, string password);
        bool Verify(User user, string hash, string password);
    }
}

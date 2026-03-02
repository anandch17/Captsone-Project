using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelInsurance.Domain.Entities;

namespace TravelInsurance.Application.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);

        Task<IEnumerable<User>> GetAgentsAsync();
       
        Task<User?> GetByUserEmailAsync(string username);
        Task<User?> GetByResetTokenAsync(string token);
        Task<bool> ExistsAsync(string username);
        Task AddAsync(User user);

        Task UpdateAsync(User user);
        Task SaveChangesAsync();
    }
}

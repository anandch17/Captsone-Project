using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelInsurance.Application.Interfaces.Repositories;
using TravelInsurance.Domain.Entities;
using TravelInsurance.Infrastructure.Data;
using TravelInsurance.Infrastructure.Repositories;

namespace TravelInsurance.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _db.Users.ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _db.Users.FindAsync(id);
        }


        public async Task<User?> GetByUserEmailAsync(string email)
        {
            return await _db.Users
                            .SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetByResetTokenAsync(string token)
        {
            return await _db.Users
                .SingleOrDefaultAsync(u => u.ResetToken == token && u.ResetTokenExpiry != null && u.ResetTokenExpiry > DateTime.UtcNow);
        }

        public async Task<bool> ExistsAsync(string email)
        {
            return await _db.Users.AnyAsync(u => u.Email == email);
        }

        public async Task AddAsync(User user)
        {
            await _db.Users.AddAsync(user);
        }

        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetAgentsAsync()
        {
            return await _db.Users
                            .Where(u => u.Role == "Agent")
                            .ToListAsync();
        }

        public async Task UpdateAsync(User user)
        {
            _db.Users.Update(user);
            await _db.SaveChangesAsync();
        }
    }
}

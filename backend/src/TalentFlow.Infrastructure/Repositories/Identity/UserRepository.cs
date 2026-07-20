using Microsoft.EntityFrameworkCore;

using TalentFlow.Application.Interfaces.Repositories;

using TalentFlow.Domain.Entities;

using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.Infrastructure.Repositories.Identity;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(
        ApplicationDbContext context
    )
    {
        _context = context;
    }

    public async Task<User?> GetByEmailAsync(
        string email
    )
    {
        return await _context.Users
            .FirstOrDefaultAsync(
                x => x.Email == email
            );
    }

    public async Task<User?> GetByIdAsync(
        Guid id
    )
    {
        return await _context.Users
            .FirstOrDefaultAsync(
                x => x.Id == id
            );
    }

    public async Task<User?> GetByResetTokenAsync(
        string token
    )
    {
        return await _context.Users
            .FirstOrDefaultAsync(
                x => x.ResetPasswordToken == token
            );
    }

    public async Task<User?> GetByEmailVerificationTokenAsync(
        string token
    )
    {
        return await _context.Users
            .FirstOrDefaultAsync(
                x => x.EmailVerificationToken == token
            );
    }

    public async Task AddAsync(
        User user
    )
    {
        await _context.Users.AddAsync(
            user
        );
    }

    public async Task<bool> ExistsAsync(
        string email
    )
    {
        return await _context.Users
            .AnyAsync(
                x => x.Email == email
            );
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users.ToListAsync();
    }
}
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(
        string email
    );

    Task<User?> GetByIdAsync(
        Guid id
    );

    Task<User?> GetByResetTokenAsync(
        string token
    );

    Task<User?> GetByEmailVerificationTokenAsync(
        string token
    );

    Task AddAsync(
        User user
    );

    Task<bool> ExistsAsync(
        string email
    );

    Task SaveChangesAsync();
}
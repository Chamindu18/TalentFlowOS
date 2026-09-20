using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories;

public interface ICandidateRepository
{
    Task<Candidate?> GetCandidateByUserIdAsync(string userId);
    Task<Candidate?> GetByIdAsync(Guid id);
    Task AddAsync(Candidate candidate);
    Task UpdateAsync(Candidate candidate);
    Task<bool> SaveChangesAsync();
}
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories;

public interface ICandidateRepository
{
    Task<Candidate?> GetCandidateByUserIdAsync(string userId);

    Task AddAsync(Candidate candidate);

    Task<bool> SaveChangesAsync();
}
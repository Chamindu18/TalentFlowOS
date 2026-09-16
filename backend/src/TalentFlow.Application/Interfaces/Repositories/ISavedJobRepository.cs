using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories;

public interface ISavedJobRepository
{
    Task<SavedJob?> GetByIdAsync(Guid id);
    Task<SavedJob?> GetByCandidateAndJobAsync(Guid candidateId, Guid jobId);
    Task<IEnumerable<SavedJob>> GetByCandidateIdAsync(Guid candidateId);
    Task AddAsync(SavedJob savedJob);
    void Delete(SavedJob savedJob);
    Task<bool> ExistsAsync(Guid candidateId, Guid jobId);
    Task<int> SaveChangesAsync();
}
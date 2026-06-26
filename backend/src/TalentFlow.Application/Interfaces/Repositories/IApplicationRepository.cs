using System;
using System.Collections.Generic;
using System.Text;

using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories;

public interface IApplicationRepository
{
    Task<Application?> GetByIdAsync(Guid id);
    Task<IEnumerable<Application>> GetByCandidateIdAsync(Guid candidateId);
    Task<IEnumerable<Application>> GetByJobIdAsync(Guid jobId);
    Task<IEnumerable<Application>> GetByStatusAsync(string status);
    Task<IEnumerable<Application>> GetApplicationsWithDetailsAsync();
    Task AddAsync(Application application);
    void Update(Application application);
    void Delete(Application application);
    Task<bool> HasCandidateAppliedAsync(Guid candidateId, Guid jobId);
    Task<int> GetApplicationCountForJobAsync(Guid jobId);
}
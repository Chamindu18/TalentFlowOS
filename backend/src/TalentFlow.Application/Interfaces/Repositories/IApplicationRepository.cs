using System;
using System.Collections.Generic;
using System.Text;

using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories;

public interface IApplicationRepository
{
    Task<JobApplication?> GetByIdAsync(Guid id);

    Task<IEnumerable<JobApplication>> GetByCandidateIdAsync(Guid candidateId);

    Task<IEnumerable<JobApplication>> GetByJobIdAsync(Guid jobId);

    Task<IEnumerable<JobApplication>> GetByStatusAsync(string status);

    Task<IEnumerable<JobApplication>> GetApplicationsWithDetailsAsync();

    Task AddAsync(JobApplication application);

    void Update(JobApplication application);

    void Delete(JobApplication application);

    Task<bool> HasCandidateAppliedAsync(Guid candidateId, Guid jobId);

    Task<int> GetApplicationCountForJobAsync(Guid jobId);

    Task<int> SaveChangesAsync();

}
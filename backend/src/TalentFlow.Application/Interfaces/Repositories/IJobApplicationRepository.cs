using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories;

public interface IJobApplicationRepository
{
    Task<JobApplication?> GetByIdAsync(Guid id);
    Task<IEnumerable<JobApplication>> GetApplicationsByCandidateIdAsync(Guid candidateId); 
    Task AddAsync(JobApplication jobApplication);
    void Update(JobApplication jobApplication);
    void Delete(JobApplication jobApplication);
    Task<int> SaveChangesAsync();
}
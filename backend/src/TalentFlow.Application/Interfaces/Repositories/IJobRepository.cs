using System;
using System.Collections.Generic;
using System.Text;

using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories;

public interface IJobRepository
{
    Task<Job?> GetByIdAsync(Guid id);
    Task<IEnumerable<Job>> GetAllAsync();
    Task<IEnumerable<Job>> GetByCompanyIdAsync(Guid companyId);
    Task<IEnumerable<Job>> GetByDepartmentIdAsync(Guid departmentId);
    Task<IEnumerable<Job>> GetActiveJobsAsync();
    Task<IEnumerable<Job>> SearchJobsAsync(string? searchTerm, string? location, string? employmentType);
    Task AddAsync(Job job);
    void Update(Job job);
    void Delete(Job job);
    Task<bool> ExistsAsync(Guid id);

    Task<int> SaveChangesAsync();
}

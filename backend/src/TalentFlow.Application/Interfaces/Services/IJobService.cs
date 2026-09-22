using System;
using System.Collections.Generic;
using System.Text;

using TalentFlow.Application.DTOs.Jobs;

namespace TalentFlow.Application.Interfaces.Services;

public interface IJobService
{
    Task<JobResponseDTO> GetByIdAsync(Guid id);

    Task CloseJobAsync(Guid id, Guid? userCompanyId = null);

    Task<IEnumerable<JobResponseDTO>> GetAllAsync();
    Task<IEnumerable<JobResponseDTO>> GetActiveJobsAsync();
    Task<IEnumerable<JobResponseDTO>> GetJobsByCompanyAsync(Guid companyId);
    Task<IEnumerable<JobResponseDTO>> GetJobsByDepartmentAsync(Guid departmentId);
    Task<IEnumerable<JobResponseDTO>> SearchJobsAsync(string? searchTerm, string? location, string? employmentType);
    Task<JobResponseDTO> CreateAsync(CreateJobRequestDTO request, Guid? userCompanyId = null);
    Task<JobResponseDTO> UpdateAsync(Guid id, UpdateJobRequestDTO request, Guid? userCompanyId = null);
    Task DeleteAsync(Guid id, Guid? userCompanyId = null);
}

using System;
using System.Collections.Generic;
using System.Text;

using TalentFlow.Application.DTOs.Applications;

namespace TalentFlow.Application.Interfaces.Services;

public interface IApplicationService
{
    Task<ApplicationResponseDTO> GetByIdAsync(Guid id);
    Task<IEnumerable<ApplicationResponseDTO>> GetByCandidateIdAsync(Guid candidateId);
    Task<IEnumerable<ApplicationResponseDTO>> GetByJobIdAsync(Guid jobId);
    Task<IEnumerable<ApplicationResponseDTO>> GetAllAsync();
    Task<IEnumerable<ApplicationResponseDTO>> GetApplicationsByStatusAsync(string status);
    Task<ApplicationResponseDTO> CreateAsync(
        CreateApplicationRequestDTO request,
        string userId
    );
    Task<ApplicationResponseDTO> UpdateStatusAsync(Guid id, UpdateApplicationStatusRequestDTO request);
    Task DeleteAsync(Guid id);
    Task<bool> HasCandidateAppliedAsync(Guid candidateId, Guid jobId);
    Task<int> GetApplicationCountForJobAsync(Guid jobId);
    Task ShortlistApplicationAsync(Guid id);
    Task<IEnumerable<ApplicationResponseDTO>> GetMyApplicationsAsync(string userId);

}

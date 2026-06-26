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
    Task<ApplicationResponseDTO> CreateAsync(CreateApplicationRequestDTO request);
    Task<ApplicationResponseDTO> UpdateStatusAsync(Guid id, UpdateApplicationStatusRequestDTO request);
    Task DeleteAsync(Guid id);
    Task<bool> HasCandidateAppliedAsync(Guid candidateId, Guid jobId);
}

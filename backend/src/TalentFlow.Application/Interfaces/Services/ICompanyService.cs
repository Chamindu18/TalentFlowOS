using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TalentFlow.Application.DTOs.Companies;

namespace TalentFlow.Application.Interfaces.Services;

public interface ICompanyService
{
    Task<CompanyResponseDTO> GetByIdAsync(Guid id);
    Task<IEnumerable<CompanyResponseDTO>> GetAllAsync();
    Task<IEnumerable<CompanyResponseDTO>> SearchAsync(string? searchTerm);
    Task<CompanyResponseDTO> CreateAsync(CreateCompanyRequestDTO request);
    Task<CompanyResponseDTO> UpdateAsync(Guid id, UpdateCompanyRequestDTO request);
    Task DeleteAsync(Guid id);
}

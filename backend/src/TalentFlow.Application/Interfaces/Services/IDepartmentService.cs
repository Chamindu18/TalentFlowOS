using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TalentFlow.Application.DTOs.Departments;

namespace TalentFlow.Application.Interfaces.Services;

public interface IDepartmentService
{
    Task<DepartmentResponseDTO> GetByIdAsync(Guid id);
    Task<IEnumerable<DepartmentResponseDTO>> GetByCompanyIdAsync(Guid companyId);
    Task<IEnumerable<DepartmentResponseDTO>> GetAllAsync();
    Task<DepartmentResponseDTO> CreateAsync(CreateDepartmentRequestDTO request);
    Task<DepartmentResponseDTO> UpdateAsync(Guid id, UpdateDepartmentRequestDTO request);
    Task DeleteAsync(Guid id);
}
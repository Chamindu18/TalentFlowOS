using System;
using System.Collections.Generic;
using System.Text;

using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories;

public interface IDepartmentRepository
{
    Task<Department?> GetByIdAsync(Guid id);
    Task<IEnumerable<Department>> GetByCompanyIdAsync(Guid companyId);
    Task<IEnumerable<Department>> GetAllAsync();
    Task AddAsync(Department department);
    void Update(Department department);
    void Delete(Department department);
    Task<bool> ExistsAsync(Guid id);
    Task<bool> NameExistsInCompanyAsync(Guid companyId, string name);
}

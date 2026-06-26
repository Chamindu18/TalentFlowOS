using System;
using System.Collections.Generic;
using System.Text;

using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories;

public interface ICompanyRepository
{
    Task<Company?> GetByIdAsync(Guid id);
    Task<IEnumerable<Company>> GetAllAsync();
    Task<IEnumerable<Company>> SearchCompaniesAsync(string? searchTerm);
    Task AddAsync(Company company);
    void Update(Company company);
    void Delete(Company company);
    Task<bool> ExistsAsync(Guid id);
    Task<bool> NameExistsAsync(string name);
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.Infrastructure.Repositories;

public class DepartmentRepository : IDepartmentRepository
{
    private readonly ApplicationDbContext _context;

    public DepartmentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Department?> GetByNameAndCompanyAsync(string name, Guid companyId)
{
    return await _context.Departments
        .FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower() 
            && x.CompanyId == companyId 
            && !x.IsDeleted);
}

public async Task<Department?> GetByIdAsync(Guid id)
{
    return await _context.Departments
        .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
}

    public async Task<IEnumerable<Department>> GetByCompanyIdAsync(Guid companyId)
    {
        return await _context.Departments
            .Include(x => x.Company)
            .Where(x => x.CompanyId == companyId && !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Department>> GetAllAsync()
    {
        return await _context.Departments
            .Include(x => x.Company)
            .Where(x => !x.IsDeleted)
            .ToListAsync();
    }

    public async Task AddAsync(Department department)
    {
        department.CreatedAt = DateTime.UtcNow;
        department.UpdatedAt = DateTime.UtcNow;
        department.IsDeleted = false;
        await _context.Departments.AddAsync(department);
    }

    public void Update(Department department)
    {
        department.UpdatedAt = DateTime.UtcNow;
        _context.Departments.Update(department);
    }

    public void Delete(Department department)
    {
        department.IsDeleted = true;
        department.UpdatedAt = DateTime.UtcNow;
        _context.Departments.Update(department);
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Departments.AnyAsync(x => x.Id == id && !x.IsDeleted);
    }

    public async Task<bool> NameExistsInCompanyAsync(Guid companyId, string name)
    {
        return await _context.Departments
            .AnyAsync(x => x.CompanyId == companyId && x.Name == name && !x.IsDeleted);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}

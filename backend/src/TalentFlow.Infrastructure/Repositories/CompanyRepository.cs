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

public class CompanyRepository : ICompanyRepository
{
    private readonly ApplicationDbContext _context;

    public CompanyRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Company?> GetByIdAsync(Guid id)
    {
        return await _context.Companies
            .Include(x => x.Departments)
            .Include(x => x.Jobs)
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
    }

    public async Task<IEnumerable<Company>> GetAllAsync()
    {
        return await _context.Companies
            .Where(x => !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Company>> SearchCompaniesAsync(string? searchTerm)
    {
        var query = _context.Companies.Where(x => !x.IsDeleted);

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(x => x.Name.Contains(searchTerm) || x.Description!.Contains(searchTerm));
        }

        return await query.ToListAsync();
    }

    public async Task AddAsync(Company company)
    {
        company.CreatedAt = DateTime.UtcNow;
        company.UpdatedAt = DateTime.UtcNow;
        company.IsDeleted = false;
        await _context.Companies.AddAsync(company);
    }

    public void Update(Company company)
    {
        company.UpdatedAt = DateTime.UtcNow;
        _context.Companies.Update(company);
    }

    public void Delete(Company company)
    {
        company.IsDeleted = true;
        company.UpdatedAt = DateTime.UtcNow;
        _context.Companies.Update(company);
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Companies.AnyAsync(x => x.Id == id && !x.IsDeleted);
    }

    public async Task<bool> NameExistsAsync(string name)
    {
        return await _context.Companies.AnyAsync(x => x.Name == name && !x.IsDeleted);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}

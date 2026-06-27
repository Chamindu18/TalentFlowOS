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

public class JobRepository : IJobRepository
{
    private readonly ApplicationDbContext _context;

    public JobRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Job?> GetByIdAsync(Guid id)
    {
        return await _context.Jobs
            .Include(x => x.Company)
            .Include(x => x.Department)
            .Include(x => x.JobApplications)
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
    }

    public async Task<IEnumerable<Job>> GetAllAsync()
    {
        return await _context.Jobs
            .Include(x => x.Company)
            .Include(x => x.Department)
            .Where(x => !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Job>> GetByCompanyIdAsync(Guid companyId)
    {
        return await _context.Jobs
            .Include(x => x.Company)
            .Include(x => x.Department)
            .Where(x => x.CompanyId == companyId && !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Job>> GetByDepartmentIdAsync(Guid departmentId)
    {
        return await _context.Jobs
            .Include(x => x.Company)
            .Include(x => x.Department)
            .Where(x => x.DepartmentId == departmentId && !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Job>> GetActiveJobsAsync()
    {
        return await _context.Jobs
            .Include(x => x.Company)
            .Include(x => x.Department)
            .Where(x => x.IsActive && !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Job>> SearchJobsAsync(string? searchTerm, string? location, string? employmentType)
    {
        var query = _context.Jobs
            .Include(x => x.Company)
            .Include(x => x.Department)
            .Where(x => !x.IsDeleted);

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(x => x.Title.Contains(searchTerm) || x.Description!.Contains(searchTerm));
        }

        if (!string.IsNullOrEmpty(location))
        {
            query = query.Where(x => x.Location != null && x.Location.Contains(location));
        }

        if (!string.IsNullOrEmpty(employmentType))
        {
            query = query.Where(x => x.EmploymentType == employmentType);
        }

        return await query.ToListAsync();
    }

    public async Task AddAsync(Job job)
    {
        job.CreatedAt = DateTime.UtcNow;
        job.UpdatedAt = DateTime.UtcNow;
        job.IsDeleted = false;
        await _context.Jobs.AddAsync(job);
    }

    public void Update(Job job)
    {
        job.UpdatedAt = DateTime.UtcNow;
        _context.Jobs.Update(job);
    }

    public void Delete(Job job)
    {
        job.IsDeleted = true;
        job.UpdatedAt = DateTime.UtcNow;
        _context.Jobs.Update(job);
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Jobs.AnyAsync(x => x.Id == id && !x.IsDeleted);
    }
}

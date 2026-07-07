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

public class JobApplicationRepository : IApplicationRepository
{
    private readonly ApplicationDbContext _context;

    public JobApplicationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<JobApplication?> GetByIdAsync(Guid id)
    {
        return await _context.Applications
            .Include(x => x.Job)
            .ThenInclude(x => x.Company)
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
    }

    public async Task<IEnumerable<JobApplication>> GetByCandidateIdAsync(Guid candidateId)
    {
        return await _context.Applications
            .Include(x => x.Job)
            .ThenInclude(x => x.Company)
            .Where(x => x.CandidateId == candidateId && !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<JobApplication>> GetByJobIdAsync(Guid jobId)
    {
        return await _context.Applications
            .Include(x => x.Job)
            .ThenInclude(x => x.Company)
            .Where(x => x.JobId == jobId && !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<JobApplication>> GetByStatusAsync(string status)
    {
        return await _context.Applications
            .Include(x => x.Job)
            .ThenInclude(x => x.Company)
            .Where(x => x.Status == status && !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<JobApplication>> GetApplicationsWithDetailsAsync()
    {
        return await _context.Applications
            .Include(x => x.Job)
            .ThenInclude(x => x.Company)
            .Where(x => !x.IsDeleted)
            .ToListAsync();
    }

    public async Task AddAsync(JobApplication application)
    {
        application.CreatedAt = DateTime.UtcNow;
        application.UpdatedAt = DateTime.UtcNow;
        application.IsDeleted = false;
        await _context.Applications.AddAsync(application);
    }

    public void Update(JobApplication application)
    {
        application.UpdatedAt = DateTime.UtcNow;
        _context.Applications.Update(application);
    }

    public void Delete(JobApplication application)
    {
        application.IsDeleted = true;
        application.UpdatedAt = DateTime.UtcNow;
        _context.Applications.Update(application);
    }

    public async Task<bool> HasCandidateAppliedAsync(Guid candidateId, Guid jobId)
    {
        return await _context.Applications
            .AnyAsync(x => x.CandidateId == candidateId && x.JobId == jobId && !x.IsDeleted);
    }

    public async Task<int> GetApplicationCountForJobAsync(Guid jobId)
    {
        return await _context.Applications
            .CountAsync(x => x.JobId == jobId && !x.IsDeleted);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}
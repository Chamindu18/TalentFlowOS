using Microsoft.EntityFrameworkCore;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.Infrastructure.Repositories;

public class ApplicationRepository : IApplicationRepository
{
    private readonly ApplicationDbContext _context;

    public ApplicationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<JobApplication?> GetByIdAsync(Guid id)
    {
        return await _context.JobApplications
            .Include(a => a.Job)
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);
    }

    public async Task<IEnumerable<JobApplication>> GetByCandidateIdAsync(Guid candidateId)
    {
        return await _context.JobApplications
            .Include(a => a.Job)
            .Where(a => a.CandidateId == candidateId && !a.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<JobApplication>> GetByJobIdAsync(Guid jobId)
    {
        return await _context.JobApplications
            .Include(a => a.Job)
            .Where(a => a.JobId == jobId && !a.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<JobApplication>> GetByStatusAsync(string status)
    {
        return await _context.JobApplications
            .Include(a => a.Job)
            .Where(a => a.Status == status && !a.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<JobApplication>> GetApplicationsWithDetailsAsync()
    {
        return await _context.JobApplications
            .Include(a => a.Job)
            .Where(a => !a.IsDeleted)
            .ToListAsync();
    }

    public async Task AddAsync(JobApplication application)
    {
        application.CreatedAt = DateTime.UtcNow;
        application.UpdatedAt = DateTime.UtcNow;

        await _context.JobApplications.AddAsync(application);
    }

    public void Update(JobApplication application)
    {
        application.UpdatedAt = DateTime.UtcNow;
        _context.JobApplications.Update(application);
    }

    public void Delete(JobApplication application)
    {
        application.IsDeleted = true;
        application.UpdatedAt = DateTime.UtcNow;
        _context.JobApplications.Update(application);
    }

    public async Task<bool> HasCandidateAppliedAsync(Guid candidateId, Guid jobId)
    {
        return await _context.JobApplications.AnyAsync(a =>
            a.CandidateId == candidateId &&
            a.JobId == jobId &&
            !a.IsDeleted);
    }

    public async Task<int> GetApplicationCountForJobAsync(Guid jobId)
    {
        return await _context.JobApplications.CountAsync(a =>
            a.JobId == jobId &&
            !a.IsDeleted);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}
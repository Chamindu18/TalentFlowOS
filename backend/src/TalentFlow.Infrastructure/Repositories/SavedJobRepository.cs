using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.Infrastructure.Repositories;

public class SavedJobRepository : ISavedJobRepository
{
    private readonly ApplicationDbContext _context;

    public SavedJobRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<SavedJob?> GetByIdAsync(Guid id)
    {
        return await _context.SavedJobs
            .Include(sj => sj.Job)
                .ThenInclude(j => j.Company)
            .Include(sj => sj.Job)
                .ThenInclude(j => j.Department)
            .Include(sj => sj.Candidate)
            .FirstOrDefaultAsync(sj => sj.Id == id);
    }

    public async Task<SavedJob?> GetByCandidateAndJobAsync(Guid candidateId, Guid jobId)
    {
        return await _context.SavedJobs
            .Include(sj => sj.Job)
                .ThenInclude(j => j.Company)
            .Include(sj => sj.Job)
                .ThenInclude(j => j.Department)
            .FirstOrDefaultAsync(sj => sj.CandidateId == candidateId && sj.JobId == jobId);
    }

    public async Task<IEnumerable<SavedJob>> GetByCandidateIdAsync(Guid candidateId)
    {
        return await _context.SavedJobs
            .Include(sj => sj.Job)
                .ThenInclude(j => j.Company)
            .Include(sj => sj.Job)
                .ThenInclude(j => j.Department)
            .Where(sj => sj.CandidateId == candidateId)
            .OrderByDescending(sj => sj.SavedAt)
            .ToListAsync();
    }

    public async Task AddAsync(SavedJob savedJob)
    {
        savedJob.SavedAt = DateTime.UtcNow;
        await _context.SavedJobs.AddAsync(savedJob);
    }

    public void Delete(SavedJob savedJob)
    {
        _context.SavedJobs.Remove(savedJob);
    }

    public async Task<bool> ExistsAsync(Guid candidateId, Guid jobId)
    {
        return await _context.SavedJobs
            .AnyAsync(sj => sj.CandidateId == candidateId && sj.JobId == jobId);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TalentFlow.Application.Interfaces.Repositories; 
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.Infrastructure.Repositories;

public class JobApplicationRepository : IJobApplicationRepository
{
    private readonly ApplicationDbContext _context;

    public JobApplicationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<JobApplication?> GetByIdAsync(Guid id)
    {
        return await _context.JobApplications.FirstOrDefaultAsync(x => x.Id == id);
    }

   
    public async Task<IEnumerable<JobApplication>> GetApplicationsByCandidateIdAsync(Guid candidateId)
    {
        return await _context.JobApplications
            .Include(x => x.Job)
            .ThenInclude(x => x.Company)
            .Where(x => x.CandidateId == candidateId)
            .ToListAsync();
    }

    public async Task AddAsync(JobApplication jobApplication)
    {
        await _context.JobApplications.AddAsync(jobApplication);
    }

    public void Update(JobApplication jobApplication)
    {
        _context.JobApplications.Update(jobApplication);
    }

    public void Delete(JobApplication jobApplication)
    {
        _context.JobApplications.Remove(jobApplication);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}
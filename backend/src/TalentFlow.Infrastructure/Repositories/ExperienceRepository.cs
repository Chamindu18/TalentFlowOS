using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace TalentFlow.Infrastructure.Repositories;

public class ExperienceRepository : IExperienceRepository
{
    private readonly ApplicationDbContext _context;
    public ExperienceRepository(ApplicationDbContext context) => _context = context;

    public async Task AddAsync(Experience experience) => await _context.Experiences.AddAsync(experience);
    public async Task<IEnumerable<Experience>> GetByCandidateIdAsync(Guid candidateId) 
        => await _context.Experiences.Where(e => e.CandidateId == candidateId).ToListAsync();
}
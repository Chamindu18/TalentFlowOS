using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace TalentFlow.Infrastructure.Repositories;

public class EducationRepository : IEducationRepository
{
    private readonly ApplicationDbContext _context;
    public EducationRepository(ApplicationDbContext context) => _context = context;

    public async Task AddAsync(Education education) => await _context.Educations.AddAsync(education);

    public async Task<IEnumerable<Education>> GetByCandidateIdAsync(Guid candidateId)
    {
        return await _context.Educations.Where(e => e.CandidateId == candidateId).ToListAsync();
    }
}
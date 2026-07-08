using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace TalentFlow.Infrastructure.Repositories;

public class SkillRepository : ISkillRepository
{
    private readonly ApplicationDbContext _context;
    public SkillRepository(ApplicationDbContext context) => _context = context;

    public async Task AddAsync(Skill skill) => await _context.Skills.AddAsync(skill);

    public async Task<IEnumerable<Skill>> GetByCandidateIdAsync(Guid candidateId)
    {
        return await _context.Skills.Where(s => s.CandidateId == candidateId).ToListAsync();
    }
}
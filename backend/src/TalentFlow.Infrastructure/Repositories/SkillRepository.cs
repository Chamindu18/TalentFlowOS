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

    public async Task<Skill?> GetByIdAsync(Guid id)
    {
        return await _context.Skills.FindAsync(id);
    }

    public async Task UpdateAsync(Skill skill)
    {
        _context.Skills.Update(skill);
        await Task.CompletedTask;
    }

    public async Task DeleteAsync(Skill skill)
    {
        _context.Skills.Remove(skill);
        await Task.CompletedTask;
    }

    public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
}
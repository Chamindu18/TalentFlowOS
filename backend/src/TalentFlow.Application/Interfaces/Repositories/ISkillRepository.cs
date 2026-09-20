using TalentFlow.Domain.Entities;
namespace TalentFlow.Application.Interfaces.Repositories;

public interface ISkillRepository
{
    Task AddAsync(Skill skill);
    Task<IEnumerable<Skill>> GetByCandidateIdAsync(Guid candidateId);
    Task<Skill?> GetByIdAsync(Guid id);
    Task UpdateAsync(Skill skill);
    Task DeleteAsync(Skill skill);
    Task<bool> SaveChangesAsync();
}
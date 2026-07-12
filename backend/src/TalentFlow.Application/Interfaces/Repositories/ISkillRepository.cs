using TalentFlow.Domain.Entities;
namespace TalentFlow.Application.Interfaces.Repositories;

public interface ISkillRepository
{
    Task AddAsync(Skill skill);
    Task<IEnumerable<Skill>> GetByCandidateIdAsync(Guid candidateId);
}
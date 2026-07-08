using TalentFlow.Domain.Entities;
namespace TalentFlow.Application.Interfaces.Repositories;
{
    Task AddAsync(Experience experience);
    Task<IEnumerable<Experience>> GetByCandidateIdAsync(Guid candidateId);
    
}
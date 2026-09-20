using TalentFlow.Domain.Entities;
namespace TalentFlow.Application.Interfaces.Repositories;


public interface IEducationRepository
{
    Task AddAsync(Education education);
    Task<IEnumerable<Education>> GetByCandidateIdAsync(Guid candidateId);
    Task<Education?> GetByIdAsync(Guid id);
    Task UpdateAsync(Education education);
    Task DeleteAsync(Education education);
    Task<bool> SaveChangesAsync();
}
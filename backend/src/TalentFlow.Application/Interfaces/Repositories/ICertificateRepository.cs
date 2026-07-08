using TalentFlow.Domain.Entities;
namespace TalentFlow.Application.Interfaces.Repositories;
{
    Task AddAsync(Certificate certificate);
    Task<IEnumerable<Certificate>> GetByCandidateIdAsync(Guid candidateId);
}
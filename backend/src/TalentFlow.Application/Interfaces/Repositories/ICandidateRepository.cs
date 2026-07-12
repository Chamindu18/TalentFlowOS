using System.Threading.Tasks;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories
{
    public interface ICandidateRepository
    {
        Task<Candidate?> GetCandidateByUserIdAsync(string userId);
        Task<bool> SaveChangesAsync();
    }
}
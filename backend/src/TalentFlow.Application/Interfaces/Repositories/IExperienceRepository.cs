using System;
using System.Threading.Tasks;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories
{
    public interface IExperienceRepository
    {
        Task<Experience?> GetByIdAsync(Guid id);
        Task AddAsync(Experience experience);
        Task UpdateAsync(Experience experience);
        Task DeleteAsync(Experience experience);
        Task<bool> SaveChangesAsync();
    }
}
using System;
using System.Threading.Tasks;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories
{
    public interface ICertificateRepository
    {
        Task<Certificate?> GetByIdAsync(Guid id);
        Task AddAsync(Certificate certificate);
        Task UpdateAsync(Certificate certificate); 
        Task DeleteAsync(Certificate certificate); 
        Task<bool> SaveChangesAsync();
    }
}
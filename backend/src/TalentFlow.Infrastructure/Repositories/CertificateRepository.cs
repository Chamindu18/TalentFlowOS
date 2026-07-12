using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;

namespace TalentFlow.Infrastructure.Repositories
{
    public class CertificateRepository : ICertificateRepository
    {
        private readonly ApplicationDbContext _context;
        public CertificateRepository(ApplicationDbContext context) => _context = context;

        public async Task<Certificate?> GetByIdAsync(Guid id) => await _context.Certificates.FindAsync(id);
        public async Task AddAsync(Certificate certificate) => await _context.Certificates.AddAsync(certificate);

        public async Task UpdateAsync(Certificate certificate) 
        {
            _context.Certificates.Update(certificate);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(Certificate certificate) 
        {
            _context.Certificates.Remove(certificate);
            await Task.CompletedTask;
        }

        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}
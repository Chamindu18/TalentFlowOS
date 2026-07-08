using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace TalentFlow.Infrastructure.Repositories;

public class CertificateRepository : ICertificateRepository
{
    private readonly ApplicationDbContext _context;
    public CertificateRepository(ApplicationDbContext context) => _context = context;

    public async Task AddAsync(Certificate certificate) => await _context.Certificates.AddAsync(certificate);

    public async Task<IEnumerable<Certificate>> GetByCandidateIdAsync(Guid candidateId)
    {
        return await _context.Certificates.Where(c => c.CandidateId == candidateId).ToListAsync();
    }
}
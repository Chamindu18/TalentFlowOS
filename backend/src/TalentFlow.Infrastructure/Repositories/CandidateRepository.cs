using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.Infrastructure.Repositories;

public class CandidateRepository : ICandidateRepository
{
    private readonly ApplicationDbContext _context;
    public CandidateRepository(ApplicationDbContext context) => _context = context;

    public async Task<Candidate?> GetCandidateByUserIdAsync(string userId)
    {
        return await _context.Candidates
            .Include(c => c.Educations)
            .Include(c => c.Experiences)
            .Include(c => c.Skills)
            .Include(c => c.Certificates)
            .FirstOrDefaultAsync(c => c.UserId == userId);
    }

    public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
}
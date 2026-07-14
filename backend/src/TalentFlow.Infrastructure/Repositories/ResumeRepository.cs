using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.Infrastructure.Repositories;

public class ResumeRepository : IResumeRepository
{
    private readonly ApplicationDbContext _context;

    public ResumeRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<string> UploadResumeAsync(string candidateId, string filePath)
    {
        
        return await Task.FromResult(filePath);
    }

    public async Task<string?> GetResumePathAsync(string candidateId)
    {
        return await Task.FromResult("path/to/resume.pdf");
    }
}
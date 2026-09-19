using System;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.Infrastructure.Repositories;

public class InterviewRepository : IInterviewRepository
{
    private readonly ApplicationDbContext _context;

    public InterviewRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> GetCountAsync()
    {
        return await _context.Interviews.CountAsync(i => !i.IsDeleted);
    }
}
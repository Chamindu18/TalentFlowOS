using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;

namespace TalentFlow.Infrastructure.Repositories
{
    public class ExperienceRepository : IExperienceRepository
    {
        private readonly ApplicationDbContext _context;
        public ExperienceRepository(ApplicationDbContext context) => _context = context;

        public async Task<Experience?> GetByIdAsync(Guid id) => await _context.Experiences.FindAsync(id);
        public async Task AddAsync(Experience experience) => await _context.Experiences.AddAsync(experience);

        public async Task UpdateAsync(Experience experience)
        {
            _context.Experiences.Update(experience);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(Experience experience)
        {
            _context.Experiences.Remove(experience);
            await Task.CompletedTask;
        }

        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}
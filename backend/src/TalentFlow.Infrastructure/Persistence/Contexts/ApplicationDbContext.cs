using Microsoft.EntityFrameworkCore;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Infrastructure.Persistence.Contexts;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Candidate> Candidates => Set<Candidate>();
    public DbSet<Education> Educations => Set<Education>();
    public DbSet<Experience> Experiences => Set<Experience>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<Certificate> Certificates => Set<Certificate>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Candidate Relationship Mapping
        modelBuilder.Entity<Candidate>(entity =>
        {
            entity.HasMany(c => c.Educations).WithOne(e => e.Candidate).HasForeignKey(e => e.CandidateId);
            entity.HasMany(c => c.Experiences).WithOne(e => e.Candidate).HasForeignKey(e => e.CandidateId);
            entity.HasMany(c => c.Skills).WithOne(s => s.Candidate).HasForeignKey(s => s.CandidateId);
            entity.HasMany(c => c.Certificates).WithOne(c => c.Candidate).HasForeignKey(c => c.CandidateId);
        });
    }
}
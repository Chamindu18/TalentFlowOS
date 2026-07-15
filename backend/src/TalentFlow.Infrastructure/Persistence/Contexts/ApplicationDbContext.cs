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
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<Job> Jobs => Set<Job>();
    public DbSet<JobApplication> JobApplications => Set<JobApplication>(); 
    public DbSet<User> Users => Set<User>();
    
public DbSet<Evaluation> Evaluations => Set<Evaluation>();
public DbSet<InterviewFeedback> InterviewFeedbacks => Set<InterviewFeedback>();
public DbSet<HiringDecision> HiringDecisions => Set<HiringDecision>();
public DbSet<Interview> Interviews => Set<Interview>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Candidate>(entity =>
        {
            entity.HasMany(c => c.Educations).WithOne(e => e.Candidate).HasForeignKey(e => e.CandidateId);
            entity.HasMany(c => c.Experiences).WithOne(e => e.Candidate).HasForeignKey(e => e.CandidateId);
            entity.HasMany(c => c.Skills).WithOne(s => s.Candidate).HasForeignKey(s => s.CandidateId);
            entity.HasMany(c => c.Certificates).WithOne(c => c.Candidate).HasForeignKey(c => c.CandidateId);
        });

        modelBuilder.Entity<JobApplication>(entity =>
{
            entity.HasOne(ja => ja.Candidate)
                .WithMany()
                .HasForeignKey(ja => ja.CandidateId);

            entity.HasOne(ja => ja.Job)
                .WithMany(j => j.JobApplications)
                .HasForeignKey(ja => ja.JobId);
        });
    }
}
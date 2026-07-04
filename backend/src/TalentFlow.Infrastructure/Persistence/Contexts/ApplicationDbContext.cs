using Microsoft.EntityFrameworkCore;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Infrastructure.Persistence.Contexts;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();


    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<Job> Jobs => Set<Job>();
    public DbSet<JobApplication> Applications => Set<JobApplication>();

    public DbSet<Interview> Interviews => Set<Interview>();
    public DbSet<InterviewSchedule> InterviewSchedules => Set<InterviewSchedule>();
    public DbSet<InterviewFeedback> InterviewFeedbacks => Set<InterviewFeedback>();



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(ApplicationDbContext).Assembly);

            // --- Interview Module Table Configurations ---

// 1. Interview Model Configuration
modelBuilder.Entity<Interview>(entity =>
{
    entity.HasKey(i => i.Id);
    entity.Property(i => i.InterviewType).IsRequired().HasMaxLength(50);
    
    // Matches your Interview.cs file perfectly
    entity.HasOne(i => i.Application)
          .WithMany(a => a.Interviews)
          .HasForeignKey(i => i.ApplicationId)
          .OnDelete(DeleteBehavior.Restrict); 
});

// 2. InterviewSchedule Model Configuration
modelBuilder.Entity<InterviewSchedule>(entity =>
{
    entity.HasKey(isched => isched.Id);
    entity.Property(isched => isched.LocationOrLink).IsRequired().HasMaxLength(500);

    entity.HasOne(isched => isched.Interview)
          .WithMany(i => i.Schedules)
          .HasForeignKey(isched => isched.InterviewId)
          .OnDelete(DeleteBehavior.Cascade);

    entity.HasOne(isched => isched.Interviewer)
          .WithMany()
          .HasForeignKey(isched => isched.InterviewerId)
          .OnDelete(DeleteBehavior.Restrict);
});

// 3. InterviewFeedback Model Configuration
modelBuilder.Entity<InterviewFeedback>(entity =>
{
    entity.HasKey(ifb => ifb.Id);
    entity.Property(ifb => ifb.Comments).IsRequired().HasMaxLength(2000);

    entity.HasOne(ifb => ifb.Interview)
          .WithMany(i => i.Feedbacks)
          .HasForeignKey(ifb => ifb.InterviewId)
          .OnDelete(DeleteBehavior.Cascade);

    entity.HasOne(ifb => ifb.Interviewer)
          .WithMany()
          .HasForeignKey(ifb => ifb.InterviewerId)
          .OnDelete(DeleteBehavior.Restrict);
});
    }
}
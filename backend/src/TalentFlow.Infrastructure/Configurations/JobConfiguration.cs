using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Infrastructure.Configurations;

public class JobConfiguration : IEntityTypeConfiguration<Job>
{
    public void Configure(EntityTypeBuilder<Job> builder)
    {
        builder.ToTable("Jobs");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(x => x.EmploymentType)
            .HasMaxLength(50);

        builder.Property(x => x.ExperienceLevel)
            .HasMaxLength(50);

        builder.Property(x => x.Location)
            .HasMaxLength(150);

        builder.Property(x => x.Status)
            .HasMaxLength(50);

        builder.Property(x => x.SalaryMin)
            .HasPrecision(18, 2);

        builder.Property(x => x.SalaryMax)
            .HasPrecision(18, 2);

        // Relationships
        builder.HasOne(x => x.Company)
            .WithMany(x => x.Jobs)
            .HasForeignKey(x => x.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Department)
            .WithMany(x => x.Jobs)
            .HasForeignKey(x => x.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.JobApplications)
            .WithOne(x => x.Job)
            .HasForeignKey(x => x.JobId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.CompanyId);
        builder.HasIndex(x => x.DepartmentId);
        builder.HasIndex(x => x.Title);
        builder.HasIndex(x => x.Status);
        builder.HasIndex(x => x.IsActive);
        builder.HasIndex(x => x.Location);
        builder.HasIndex(x => x.IsRemote);
    }
}

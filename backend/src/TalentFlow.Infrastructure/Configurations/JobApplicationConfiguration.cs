using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Infrastructure.Configurations;

public class JobApplicationConfiguration : IEntityTypeConfiguration<JobApplication>
{
    public void Configure(EntityTypeBuilder<JobApplication> builder)
    {
        builder.ToTable("Applications");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Status)
            .HasMaxLength(50);

        // Relationships
        builder.HasOne(x => x.Job)
            .WithMany(x => x.JobApplications)
            .HasForeignKey(x => x.JobId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.CandidateId);
        builder.HasIndex(x => x.JobId);
        builder.HasIndex(x => x.Status);
        builder.HasIndex(x => x.AppliedAt);

        // Unique constraint to prevent duplicate applications
        builder.HasIndex(x => new { x.CandidateId, x.JobId })
            .IsUnique();
    }
}

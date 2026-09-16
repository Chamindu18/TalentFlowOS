using System;

namespace TalentFlow.Domain.Entities;

public class SavedJob
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid CandidateId { get; set; }

    public Guid JobId { get; set; }

    public DateTime SavedAt { get; set; } = DateTime.UtcNow;

    public Candidate Candidate { get; set; } = null!;

    public Job Job { get; set; } = null!;
}
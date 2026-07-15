using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Domain.Entities;

public class JobApplication
{
    public Guid Id { get; set; }
    public Guid CandidateId { get; set; }
    public Guid JobId { get; set; }

    [MaxLength(50)]
    public string? Status { get; set; }

    public DateTime AppliedAt { get; set; }
    public string? CoverLetter { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation Properties
    public Job Job { get; set; } = null!;
    public Candidate Candidate { get; set; } = null!; 
    public ICollection<Interview> Interviews { get; set; } = new List<Interview>();
}
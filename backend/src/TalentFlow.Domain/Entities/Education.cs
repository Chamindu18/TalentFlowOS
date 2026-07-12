using System;

namespace TalentFlow.Domain.Entities;

public class Education
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CandidateId { get; set; }
    public string InstitutionName { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public Candidate Candidate { get; set; } = null!;
}

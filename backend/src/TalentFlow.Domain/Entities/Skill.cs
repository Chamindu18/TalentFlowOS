using System;

namespace TalentFlow.Domain.Entities;

public class Skill
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CandidateId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ProficiencyLevel { get; set; } = string.Empty;
    public Candidate Candidate { get; set; } = null!;
}
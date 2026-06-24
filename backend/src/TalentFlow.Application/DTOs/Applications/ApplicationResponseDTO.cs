using System;
using System.Collections.Generic;
using System.Text;

namespace TalentFlow.Application.DTOs.Applications;

public class ApplicationResponseDTO
{
    public Guid Id { get; set; }
    public Guid CandidateId { get; set; }
    public Guid JobId { get; set; }
    public string? Status { get; set; }
    public DateTime AppliedAt { get; set; }
    public string? CoverLetter { get; set; }
    public string CandidateName { get; set; } = null!;
    public string JobTitle { get; set; } = null!;
    public string CompanyName { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

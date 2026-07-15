using System;

namespace TalentFlow.Application.DTOs.Candidate
{
    public class SavedJobDto
    {
        public Guid SavedJobId { get; set; }
        public Guid JobId { get; set; }
        public string JobTitle { get; set; } = null!;
        public string CompanyName { get; set; } = null!;
        public string Location { get; set; } = null!;
        public DateTime SavedAt { get; set; }
    }
}
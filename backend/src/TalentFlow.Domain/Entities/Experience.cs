using System;

namespace TalentFlow.Domain.Entities
{
    public class Experience
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsCurrentJob { get; set; } = false;
        public string Description { get; set; } = string.Empty;

        
        public Candidate Candidate { get; set; } = null!;
    }
}
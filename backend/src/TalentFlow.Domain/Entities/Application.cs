using System;

namespace TalentFlow.Domain.Entities
{
    public class Application
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public Guid JobId { get; set; } 
        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Applied"; 

    
        public Candidate Candidate { get; set; } = null!;
    }
}
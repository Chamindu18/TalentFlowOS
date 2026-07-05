using System;

namespace TalentFlow.Domain.Entities
{
    public class HiringDecision
    {
        public Guid Id { get; set; }
        public Guid ApplicationId { get; set; }
        public Guid ManagerId { get; set; }
        
        // Initialize with an empty string since a decision status is mandatory
        public string Decision { get; set; } = string.Empty; 
        
        // Add '?' because a written justification might be optional
        public string? Justification { get; set; } 
        
        public DateTime DecidedAt { get; set; } = DateTime.UtcNow;
    }
}
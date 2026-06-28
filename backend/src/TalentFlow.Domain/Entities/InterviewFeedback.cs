using System;

namespace TalentFlow.Domain.Entities
{
    public class InterviewFeedback
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid InterviewId { get; set; }
        public Guid InterviewerId { get; set; }
        public int Rating { get; set; } // Strict 1-5 scale per Handbook rules
        public string Comments { get; set; } = string.Empty;
        public bool PassedRecommendation { get; set; }

        // Audit Tracking Fields
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public Interview? Interview { get; set; }
        public User? Interviewer { get; set; }
    }
}
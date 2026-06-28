using System;

namespace TalentFlow.Domain.Entities
{
    public class InterviewSchedule
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid InterviewId { get; set; }
        public DateTime ScheduledTime { get; set; }
        public int DurationMinutes { get; set; } = 45; 
        public string LocationOrLink { get; set; } = string.Empty; // Microsoft Teams / Zoom Link or Office Room
        public Guid InterviewerId { get; set; } // References the User entity (Hiring Manager/Recruiter)

        // Audit Tracking Fields
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public Interview? Interview { get; set; }
        public User? Interviewer { get; set; }
    }
}
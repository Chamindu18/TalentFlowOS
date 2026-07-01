using System;
using System.Collections.Generic;

namespace TalentFlow.Domain.Entities
{
    public class Interview
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid ApplicationId { get; set; }
        public int RoundNumber { get; set; }
        public string InterviewType { get; set; } = string.Empty; // e.g., HR, Technical, Managerial, Final
        public int Status { get; set; } // 1 = Scheduled, 2 = Completed, 3 = Cancelled, 4 = Rejected, 5 = Passed

        public string? Notes { get; set; }

        // Audit Tracking Fields (Matching BaseEntity Requirements)
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }

        // Navigation Properties
        public JobApplication? Application { get; set; }
        public ICollection<InterviewSchedule> Schedules { get; set; } = new List<InterviewSchedule>();
        public ICollection<InterviewFeedback> Feedbacks { get; set; } = new List<InterviewFeedback>();
    }
}
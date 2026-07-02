using System;

namespace TalentFlow.Domain.Entities
{
    public class Education
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public string Institution { get; set; } = string.Empty; 
        public string Degree { get; set; } = string.Empty;      
        public string FieldOfStudy { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public double? Gpa { get; set; }

        
        public Candidate Candidate { get; set; } = null!;
    }
}
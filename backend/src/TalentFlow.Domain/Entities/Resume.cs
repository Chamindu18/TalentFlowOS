using System;

namespace TalentFlow.Domain.Entities
{
    public class Resume
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty; 
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

     
        public Candidate Candidate { get; set; } = null!;
    }
}
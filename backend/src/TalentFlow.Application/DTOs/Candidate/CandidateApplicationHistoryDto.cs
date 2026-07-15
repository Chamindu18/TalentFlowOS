namespace TalentFlow.Application.DTOs.Candidate
{
    public class CandidateApplicationHistoryDto
    {
        public Guid ApplicationId { get; set; }
        public Guid JobId { get; set; }
        public string JobTitle { get; set; } = null!;
        public string CompanyName { get; set; } = null!;
        public string Status { get; set; } = null!; // Pending, Interviewing, Accepted, Rejected
        public DateTime AppliedAt { get; set; }
        public string ResumeUrl { get; set; } = null!;
    }
}
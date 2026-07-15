namespace TalentFlow.Application.DTOs.Candidate
{
    public class ApplyJobDto
    {
        public Guid JobId { get; set; }
        public Stream ResumeStream { get; set; } = null!;
        public string FileName { get; set; } = null!;
        public string? CoverLetter { get; set; }
    }
}
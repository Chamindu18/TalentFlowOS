namespace TalentFlow.Application.DTOs.Candidate
{
    public class UpdateCandidateProfileDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty; 
        public string PhoneNumber { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty; 
        
       
        public byte[]? ResumeData { get; set; }
        public string? ResumeFileName { get; set; }
    }
}
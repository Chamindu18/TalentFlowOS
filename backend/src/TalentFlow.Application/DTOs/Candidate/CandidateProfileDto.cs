namespace TalentFlow.Application.DTOs.Candidate
{
    public class CandidateProfileDto
    {
        public string FirstName { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public List<EducationDto>? Educations { get; set; }
        public List<ExperienceDto>? Experiences { get; set; }
        public List<SkillDto>? Skills { get; set; }
        public List<CertificateDto>? Certificates { get; set; }
    }
}
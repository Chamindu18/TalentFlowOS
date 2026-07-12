using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TalentFlow.Application.DTOs.Candidate;

namespace TalentFlow.Application.Interfaces.Services
{
  
    public class CandidateProfileDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public List<EducationDto> Educations { get; set; } = new();
        public List<ExperienceDto> Experiences { get; set; } = new();
        public List<SkillDto> Skills { get; set; } = new();
        public List<CertificateDto> Certificates { get; set; } = new();
    }

    public class UpdateCandidateProfileDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }

    
    public interface ICandidateService
    {
        Task<CandidateProfileDto?> GetProfileByUserIdAsync(string userId);
        Task<CandidateProfileDto> UpdateProfileAsync(string userId, UpdateCandidateProfileDto dto);
        
        Task<bool> AddEducationAsync(string userId, EducationDto educationDto);
        Task<bool> AddExperienceAsync(string userId, ExperienceDto experienceDto);
        Task<bool> AddSkillAsync(string userId, SkillDto skillDto);
        Task<bool> AddCertificateAsync(string userId, CertificateDto certificateDto);
    }
}
using System;
using System.Threading.Tasks;
using TalentFlow.Application.DTOs.Candidate;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Services
{
    public class CandidateService : ICandidateService
    {
        private readonly ICandidateRepository _repository;
        private readonly IExperienceRepository _experienceRepository;
        private readonly ISkillRepository _skillRepository;
        private readonly ICertificateRepository _certificateRepository;

        public CandidateService(
            ICandidateRepository repository,
            IExperienceRepository experienceRepository,
            ISkillRepository skillRepository,
            ICertificateRepository certificateRepository)
        {
            _repository = repository;
            _experienceRepository = experienceRepository;
            _skillRepository = skillRepository;
            _certificateRepository = certificateRepository;
        }

        public async Task<CandidateProfileDto?> GetProfileByUserIdAsync(string userId) => null;

        public async Task<CandidateProfileDto> UpdateProfileAsync(string userId, UpdateCandidateProfileDto dto) => new CandidateProfileDto();

        public async Task<bool> AddEducationAsync(string userId, EducationDto educationDto)
        {
            var candidate = await _repository.GetCandidateByUserIdAsync(userId);
            if (candidate == null) return false;

            var education = new Education
            {
                Institution = educationDto.Institution,
                Degree = educationDto.Degree,
                FieldOfStudy = educationDto.FieldOfStudy,
                StartDate = educationDto.StartDate,
                EndDate = educationDto.EndDate,
                Gpa = educationDto.Gpa,
                CandidateId = candidate.Id
            };

            candidate.Educations.Add(education); 
            return await _repository.SaveChangesAsync();
        }

        public async Task<bool> AddExperienceAsync(string userId, ExperienceDto experienceDto)
        {
            var candidate = await _repository.GetCandidateByUserIdAsync(userId);
            if (candidate == null) return false;

            var experience = new Experience
            {
                CandidateId = candidate.Id,
                CompanyName = experienceDto.CompanyName,
                Role = experienceDto.Role,
                StartDate = experienceDto.StartDate,
                EndDate = experienceDto.EndDate,
                IsCurrent = experienceDto.IsCurrent
            };

            await _experienceRepository.AddAsync(experience);
            return await _repository.SaveChangesAsync();
        }

        public async Task<bool> AddSkillAsync(string userId, SkillDto skillDto)
        {
            var candidate = await _repository.GetCandidateByUserIdAsync(userId);
            if (candidate == null) return false;

            var skill = new Skill
            {
                CandidateId = candidate.Id,
                Name = skillDto.Name,
                ProficiencyLevel = skillDto.ProficiencyLevel
            };

            await _skillRepository.AddAsync(skill);
            return await _repository.SaveChangesAsync();
        }

        public async Task<bool> AddCertificateAsync(string userId, CertificateDto certificateDto)
        {
            var candidate = await _repository.GetCandidateByUserIdAsync(userId);
            if (candidate == null) return false;

            var certificate = new Certificate
            {
                CandidateId = candidate.Id,
                Name = certificateDto.Name,
                IssuingOrganization = certificateDto.IssuingOrganization,
                IssueDate = certificateDto.IssueDate
            };

            await _certificateRepository.AddAsync(certificate);
            return await _repository.SaveChangesAsync();
        }
    }
}
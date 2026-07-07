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

        public CandidateService(ICandidateRepository repository)
        {
            _repository = repository;
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
    }
}
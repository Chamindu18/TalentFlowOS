using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TalentFlow.Application.DTOs.Candidate;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace TalentFlow.Application.Services
{
    public class CandidateService : ICandidateService
    {
        private readonly IJobApplicationRepository _applicationRepository;
        private readonly IJobRepository _jobRepository;

        public CandidateService(
            IJobApplicationRepository applicationRepository,
            IJobRepository jobRepository)
        {
            _applicationRepository = applicationRepository;
            _jobRepository = jobRepository;
        }

        public async Task<string> UploadResumeAsync(Guid candidateId, string fileName, byte[] fileBytes)
        {
            var basePath = AppDomain.CurrentDomain.BaseDirectory;
            var uploadsFolder = Path.Combine(basePath, "wwwroot", "resumes");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = $"{Guid.NewGuid()}_{fileName}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            await File.WriteAllBytesAsync(filePath, fileBytes);

            return $"/resumes/{uniqueFileName}";
        }

        public async Task<CandidateProfileDto?> GetProfileByUserIdAsync(string userId)
        {
            return new CandidateProfileDto { FirstName = "Dummy Profile" };
        }

        public async Task<bool> UpdateProfileAsync(string userId, UpdateCandidateProfileDto dto)
        {
            return true; 
        }

        public async Task<bool> AddEducationAsync(string userId, EducationDto educationDto) => true;
        public async Task<bool> AddExperienceAsync(string userId, ExperienceDto experienceDto) => true;
        public async Task<bool> AddSkillAsync(string userId, SkillDto skillDto) => true;
        public async Task<bool> AddCertificateAsync(string userId, CertificateDto certificateDto) => true;

        public async Task<int> GetProfileCompletionPercentageAsync(string userId)
        {
            var profile = await GetProfileByUserIdAsync(userId);
            if (profile == null) return 0;

            int score = 0;
            int totalSteps = 6;

            if (!string.IsNullOrEmpty(profile.FirstName)) score++;
            if (!string.IsNullOrEmpty(profile.Phone)) score++;
            if (profile.Educations != null && profile.Educations.Any()) score++;
            if (profile.Experiences != null && profile.Experiences.Any()) score++;
            if (profile.Skills != null && profile.Skills.Any()) score++;
            if (profile.Certificates != null && profile.Certificates.Any()) score++;

            double percentage = ((double)score / totalSteps) * 100;
            return (int)Math.Round(percentage);
        }

        public async Task<bool> SaveJobAsync(Guid candidateId, Guid jobId) => true;

        public async Task<IEnumerable<SavedJobDto>> GetSavedJobsAsync(Guid candidateId)
        {
            return new List<SavedJobDto>
            {
                new SavedJobDto { SavedJobId = Guid.NewGuid(), JobId = Guid.NewGuid(), JobTitle = "Software Engineer Backend", CompanyName = "Sysco LABS (Sample)", Location = "Colombo", SavedAt = DateTime.UtcNow }
            };
        }

        public async Task<bool> UnsaveJobAsync(Guid savedJobId, Guid candidateId) => true;

        public async Task<bool> ApplyForJobAsync(Guid candidateId, ApplyJobDto applyJobDto)
        {
            var job = await _jobRepository.GetByIdAsync(applyJobDto.JobId);
            if (job == null) return false;

            var application = new JobApplication
            {
                Id = Guid.NewGuid(),
                JobId = applyJobDto.JobId,
                CandidateId = candidateId,
                CoverLetter = applyJobDto.FileName, 
                Status = "Pending", 
                AppliedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false
            };

            await _applicationRepository.AddAsync(application);
            await _applicationRepository.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CandidateApplicationHistoryDto>> GetApplicationHistoryAsync(Guid candidateId)
        {
            
            var applications = await _applicationRepository.GetApplicationsByCandidateIdAsync(candidateId);

           
            return applications.Select(app => new CandidateApplicationHistoryDto
            {
                ApplicationId = app.Id,
                JobId = app.JobId,
                
                JobTitle = app.Job?.Title ?? "Unknown Job",
                CompanyName = (app.Job != null && app.Job.Company != null) ? app.Job.Company.Name : "Unknown Company",
                Status = app.Status ?? "Pending",
                AppliedAt = app.AppliedAt,
                ResumeUrl = app.CoverLetter ?? "" 
            }).ToList();
        }

        public async Task<bool> WithdrawApplicationAsync(Guid applicationId, Guid candidateId)
        {
            var application = await _applicationRepository.GetByIdAsync(applicationId);
            if (application == null || application.CandidateId != candidateId) 
                return false;

            _applicationRepository.Delete(application);
            await _applicationRepository.SaveChangesAsync();
            return true; 
        }
        
        public async Task<bool> UpdateNotificationPreferencesAsync(string userId, bool receiveNotifications) => true;
        public async Task<bool> ChangePasswordAsync(string userId, string oldPassword, string newPassword) => true;
    }
}
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
using AutoMapper;

namespace TalentFlow.Application.Services
{
    public class CandidateService : ICandidateService
    {
        private readonly IJobApplicationRepository _applicationRepository;
        private readonly IJobRepository _jobRepository;
        private readonly ISavedJobRepository _savedJobRepository;
        private readonly ICandidateRepository _candidateRepository;
        private readonly IEducationRepository _educationRepository;
        private readonly IExperienceRepository _experienceRepository;
        private readonly ISkillRepository _skillRepository;
        private readonly ICertificateRepository _certificateRepository;
        private readonly IMapper _mapper;

        public CandidateService(
            IJobApplicationRepository applicationRepository,
            IJobRepository jobRepository,
            ISavedJobRepository savedJobRepository,
            ICandidateRepository candidateRepository,
            IEducationRepository educationRepository,
            IExperienceRepository experienceRepository,
            ISkillRepository skillRepository,
            ICertificateRepository certificateRepository,
            IMapper mapper)
        {
            _applicationRepository = applicationRepository;
            _jobRepository = jobRepository;
            _savedJobRepository = savedJobRepository;
            _candidateRepository = candidateRepository;
            _educationRepository = educationRepository;
            _experienceRepository = experienceRepository;
            _skillRepository = skillRepository;
            _certificateRepository = certificateRepository;
            _mapper = mapper;
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
            var candidate = await _candidateRepository.GetCandidateByUserIdAsync(userId);
            if (candidate == null) return null;

            return _mapper.Map<CandidateProfileDto>(candidate);
        }

        public async Task<bool> UpdateProfileAsync(string userId, UpdateCandidateProfileDto dto)
        {
            var candidate = await _candidateRepository.GetCandidateByUserIdAsync(userId);
            if (candidate == null) return false;

            _mapper.Map(dto, candidate);
            candidate.UpdatedAt = DateTime.UtcNow;

            await _candidateRepository.UpdateAsync(candidate);
            return await _candidateRepository.SaveChangesAsync();
        }

        public async Task<bool> AddEducationAsync(string userId, EducationDto educationDto)
        {
            var candidate = await _candidateRepository.GetCandidateByUserIdAsync(userId);
            if (candidate == null) return false;

            var education = _mapper.Map<Education>(educationDto);
            education.CandidateId = candidate.Id;

            await _educationRepository.AddAsync(education);
            return await _educationRepository.SaveChangesAsync();
        }

        public async Task<bool> AddExperienceAsync(string userId, ExperienceDto experienceDto)
        {
            var candidate = await _candidateRepository.GetCandidateByUserIdAsync(userId);
            if (candidate == null) return false;

            var experience = _mapper.Map<Experience>(experienceDto);
            experience.CandidateId = candidate.Id;

            await _experienceRepository.AddAsync(experience);
            return await _experienceRepository.SaveChangesAsync();
        }

        public async Task<bool> AddSkillAsync(string userId, SkillDto skillDto)
        {
            var candidate = await _candidateRepository.GetCandidateByUserIdAsync(userId);
            if (candidate == null) return false;

            var skill = _mapper.Map<Skill>(skillDto);
            skill.CandidateId = candidate.Id;

            await _skillRepository.AddAsync(skill);
            return await _skillRepository.SaveChangesAsync();
        }

        public async Task<bool> AddCertificateAsync(string userId, CertificateDto certificateDto)
        {
            var candidate = await _candidateRepository.GetCandidateByUserIdAsync(userId);
            if (candidate == null) return false;

            var certificate = _mapper.Map<Certificate>(certificateDto);
            certificate.CandidateId = candidate.Id;

            await _certificateRepository.AddAsync(certificate);
            return await _certificateRepository.SaveChangesAsync();
        }

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

        public async Task<bool> SaveJobAsync(Guid candidateId, Guid jobId)
        {
            var exists = await _savedJobRepository.ExistsAsync(candidateId, jobId);
            if (exists)
            {
                return false;
            }

            var job = await _jobRepository.GetByIdAsync(jobId);
            if (job == null)
            {
                return false;
            }

            var savedJob = new SavedJob
            {
                CandidateId = candidateId,
                JobId = jobId
            };

            await _savedJobRepository.AddAsync(savedJob);
            await _savedJobRepository.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<SavedJobDto>> GetSavedJobsAsync(Guid candidateId)
        {
            var savedJobs = await _savedJobRepository.GetByCandidateIdAsync(candidateId);
            
            return savedJobs.Select(sj => new SavedJobDto
            {
                SavedJobId = sj.Id,
                JobId = sj.JobId,
                JobTitle = sj.Job?.Title ?? "Unknown Job",
                CompanyName = sj.Job?.Company?.Name ?? "Unknown Company",
                Location = sj.Job?.Location ?? "Unknown Location",
                SavedAt = sj.SavedAt
            }).ToList();
        }

        public async Task<bool> UnsaveJobAsync(Guid savedJobId, Guid candidateId)
        {
            var savedJob = await _savedJobRepository.GetByIdAsync(savedJobId);
            if (savedJob == null || savedJob.CandidateId != candidateId)
            {
                return false;
            }

            _savedJobRepository.Delete(savedJob);
            await _savedJobRepository.SaveChangesAsync();
            return true;
        }

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
        
        public async Task<bool> UpdateNotificationPreferencesAsync(string userId, bool receiveNotifications)
        {
            var candidate = await _candidateRepository.GetCandidateByUserIdAsync(userId);
            if (candidate == null) return false;
            
            return await _candidateRepository.SaveChangesAsync();
        }

        public async Task<bool> ChangePasswordAsync(string userId, string oldPassword, string newPassword)
        {
            return false;
        }
    }
}
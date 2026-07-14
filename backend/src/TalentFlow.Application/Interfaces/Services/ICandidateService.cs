using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TalentFlow.Application.DTOs.Candidate; 

namespace TalentFlow.Application.Interfaces.Services
{
    public interface ICandidateService
    {
        // Profile Core Operations
        Task<CandidateProfileDto?> GetProfileByUserIdAsync(string userId);
        Task<bool> UpdateProfileAsync(string userId, UpdateCandidateProfileDto dto);
        Task<bool> AddEducationAsync(string userId, EducationDto educationDto);
        Task<bool> AddExperienceAsync(string userId, ExperienceDto experienceDto);
        Task<bool> AddSkillAsync(string userId, SkillDto skillDto);
        Task<bool> AddCertificateAsync(string userId, CertificateDto certificateDto);
        Task<int> GetProfileCompletionPercentageAsync(string userId);

        // Job Application Operations
        Task<bool> ApplyForJobAsync(Guid candidateId, ApplyJobDto applyJobDto);
        Task<IEnumerable<CandidateApplicationHistoryDto>> GetApplicationHistoryAsync(Guid candidateId);
        Task<bool> WithdrawApplicationAsync(Guid applicationId, Guid candidateId);

        // Saved Jobs Operations
        Task<bool> SaveJobAsync(Guid candidateId, Guid jobId);
        Task<IEnumerable<SavedJobDto>> GetSavedJobsAsync(Guid candidateId);
        Task<bool> UnsaveJobAsync(Guid savedJobId, Guid candidateId);

       
        Task<bool> UpdateNotificationPreferencesAsync(string userId, bool receiveNotifications);
        Task<bool> ChangePasswordAsync(string userId, string oldPassword, string newPassword);

        // Resume Upload Infrastructure
        Task<string> UploadResumeAsync(Guid candidateId, string fileName, byte[] fileBytes);
    }
}
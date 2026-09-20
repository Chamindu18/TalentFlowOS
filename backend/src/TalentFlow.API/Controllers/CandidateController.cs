using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using TalentFlow.Application.DTOs.Candidate;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Exceptions;

namespace TalentFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Candidate")]
    public class CandidateController : ControllerBase
    {
        private readonly ICandidateService _candidateService;
        private readonly ICandidateRepository _candidateRepository;

        public CandidateController(ICandidateService candidateService, ICandidateRepository candidateRepository)
        {
            _candidateService = candidateService;
            _candidateRepository = candidateRepository;
        }

        private async Task<Guid> GetCandidateIdAsync()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString)) 
                throw new UnauthorizedAccessException();

            var candidate = await _candidateRepository.GetCandidateByUserIdAsync(userIdString);
            if (candidate == null)
                throw new NotFoundException("Candidate profile not found.");

            return candidate.Id;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboardData()
        {
            try
            {
                var candidateId = await GetCandidateIdAsync();
                
                var completion = await _candidateService.GetProfileCompletionPercentageAsync(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
                var applications = await _candidateService.GetApplicationHistoryAsync(candidateId);
            
                var appList = applications?.ToList() ?? new List<CandidateApplicationHistoryDto>();
            
                return Ok(new {
                    profileCompletion = completion,
                    totalApplications = appList.Count,
                    recentApplications = appList.Take(5).Select(app => new {
                        jobTitle = app.JobTitle,
                        companyName = app.CompanyName,
                        status = app.Status
                    })
                });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("analytics")]
        public async Task<IActionResult> GetAnalytics()
        {
            try
            {
                var candidateId = await GetCandidateIdAsync();
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
                
                var completion = await _candidateService.GetProfileCompletionPercentageAsync(userId);
                var applications = await _candidateService.GetApplicationHistoryAsync(candidateId);
                
                var appList = applications?.ToList() ?? new List<CandidateApplicationHistoryDto>();
                var savedJobs = await _candidateService.GetSavedJobsAsync(candidateId);
                var savedJobsList = savedJobs?.ToList() ?? new List<SavedJobDto>();
                
                // Count applications by status
                var statusCounts = appList.GroupBy(a => a.Status)
                    .ToDictionary(g => g.Key, g => g.Count());

                return Ok(new {
                    profileCompletion = completion,
                    totalApplications = appList.Count,
                    totalSavedJobs = savedJobsList.Count,
                    applicationsByStatus = statusCounts,
                    recentApplications = appList.Take(5).Select(app => new {
                        jobTitle = app.JobTitle,
                        companyName = app.CompanyName,
                        status = app.Status,
                        appliedAt = app.AppliedAt
                    })
                });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("apply")]
        public async Task<IActionResult> ApplyJob([FromForm] ApplyJobDto dto)
        {
            try
            {
                var candidateId = await GetCandidateIdAsync();
                var result = await _candidateService.ApplyForJobAsync(candidateId, dto);

                if (!result) return BadRequest("Failed to apply for the job.");
                return Ok(new { message = "Application submitted successfully!" });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("applications")]
        public async Task<IActionResult> GetApplicationHistory()
        {
            try
            {
                var candidateId = await GetCandidateIdAsync();
                var history = await _candidateService.GetApplicationHistoryAsync(candidateId);
                return Ok(history);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("applications/{id}/withdraw")]
        public async Task<IActionResult> WithdrawApplication(Guid id)
        {
            try
            {
                var candidateId = await GetCandidateIdAsync();
                var result = await _candidateService.WithdrawApplicationAsync(id, candidateId);

                if (!result) return BadRequest("Could not withdraw application.");
                return Ok(new { message = "Application withdrawn successfully." });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("profile-completion")]
        public async Task<IActionResult> GetProfileCompletion()
        {
            try
            {
                var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userIdString)) return Unauthorized();

                var percentage = await _candidateService.GetProfileCompletionPercentageAsync(userIdString);
                return Ok(new { completionPercentage = percentage });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
        }

        [HttpPost("jobs/{jobId}/save")]
        public async Task<IActionResult> SaveJob(Guid jobId)
        {
            try
            {
                var candidateId = await GetCandidateIdAsync();
                var result = await _candidateService.SaveJobAsync(candidateId, jobId);

                if (!result) return BadRequest("Failed to save the job.");
                return Ok(new { message = "Job saved successfully!" });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("saved-jobs")]
        public async Task<IActionResult> GetSavedJobs()
        {
            try
            {
                var candidateId = await GetCandidateIdAsync();
                var savedJobs = await _candidateService.GetSavedJobsAsync(candidateId);
                return Ok(savedJobs);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("saved-jobs/{id}")]
        public async Task<IActionResult> UnsaveJob(Guid id)
        {
            try
            {
                var candidateId = await GetCandidateIdAsync();
                var result = await _candidateService.UnsaveJobAsync(id, candidateId);

                if (!result) return BadRequest("Could not unsave the job.");
                return Ok(new { message = "Job removed from saved list." });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateCandidateProfileDto dto)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString)) return Unauthorized();

            var result = await _candidateService.UpdateProfileAsync(userIdString, dto);
            return result ? Ok(new { message = "Profile updated successfully." }) : BadRequest(new { message = "Error updating profile." });
        }

        [HttpPut("settings/notifications")]
        public async Task<IActionResult> UpdateNotifications([FromBody] UpdateNotificationsDto dto)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString)) return Unauthorized();

            var result = await _candidateService.UpdateNotificationPreferencesAsync(userIdString, dto.ReceiveNotifications);
            return result ? Ok(new { message = "Notification settings updated." }) : BadRequest();
        }

        [HttpPost("settings/change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString)) return Unauthorized();

            var result = await _candidateService.ChangePasswordAsync(userIdString, dto.OldPassword, dto.NewPassword);
            if (!result) return BadRequest("Password change failed.");
            return Ok(new { message = "Password changed successfully." });
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                         ?? User.FindFirst("sub")?.Value 
                         ?? User.FindFirst("nameid")?.Value;

            var email = User.FindFirst(ClaimTypes.Email)?.Value 
                        ?? User.FindFirst("email")?.Value;

            foreach (var c in claims) {
                Console.WriteLine($"CLAIM TYPE: {c.Type} | VALUE: {c.Value}");
            }

            return Ok(new { 
                userId = userId, 
                email = email, 
                role = User.FindFirst(ClaimTypes.Role)?.Value ?? "Candidate"
            });
        }
    }

    // Helper DTO for mapped settings requests
    public class UpdateNotificationsDto
    {
        public bool ReceiveNotifications { get; set; }
    }
}
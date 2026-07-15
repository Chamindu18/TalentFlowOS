using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using TalentFlow.Application.DTOs.Candidate;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Candidate")]
    public class CandidateController : ControllerBase
    {
        private readonly ICandidateService _candidateService;

        public CandidateController(ICandidateService candidateService)
        {
            _candidateService = candidateService;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboardData()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            Console.WriteLine("DEBUG: Logged In User ID: " + userIdString);

            if (string.IsNullOrEmpty(userIdString)) return Unauthorized();
            
            var userId = Guid.Parse(userIdString);
            
            var completion = await _candidateService.GetProfileCompletionPercentageAsync(userIdString);
            var applications = await _candidateService.GetApplicationHistoryAsync(userId);
            
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

        [HttpPost("apply")]
        public async Task<IActionResult> ApplyJob([FromForm] ApplyJobDto dto)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString)) return Unauthorized();
            
            var candidateId = Guid.Parse(userIdString);
            var result = await _candidateService.ApplyForJobAsync(candidateId, dto);

            if (!result) return BadRequest("Failed to apply for the job.");
            return Ok(new { message = "Application submitted successfully!" });
        }

        [HttpGet("applications")]
        public async Task<IActionResult> GetApplicationHistory()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString)) return Unauthorized();

            var candidateId = Guid.Parse(userIdString);
            var history = await _candidateService.GetApplicationHistoryAsync(candidateId);
            return Ok(history);
        }

        [HttpDelete("applications/{id}/withdraw")]
        public async Task<IActionResult> WithdrawApplication(Guid id)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString)) return Unauthorized();

            var candidateId = Guid.Parse(userIdString);
            var result = await _candidateService.WithdrawApplicationAsync(id, candidateId);

            if (!result) return BadRequest("Could not withdraw application.");
            return Ok(new { message = "Application withdrawn successfully." });
        }

        [HttpGet("profile-completion")]
        public async Task<IActionResult> GetProfileCompletion()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString)) return Unauthorized();

            var percentage = await _candidateService.GetProfileCompletionPercentageAsync(userIdString);
            return Ok(new { completionPercentage = percentage });
        }

        [HttpPost("jobs/{jobId}/save")]
        public async Task<IActionResult> SaveJob(Guid jobId)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString)) return Unauthorized();

            var candidateId = Guid.Parse(userIdString);
            var result = await _candidateService.SaveJobAsync(candidateId, jobId);

            if (!result) return BadRequest("Failed to save the job.");
            return Ok(new { message = "Job saved successfully!" });
        }

        [HttpGet("saved-jobs")]
        public async Task<IActionResult> GetSavedJobs()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString)) return Unauthorized();

            var candidateId = Guid.Parse(userIdString);
            var savedJobs = await _candidateService.GetSavedJobsAsync(candidateId);
            return Ok(savedJobs);
        }

        [HttpDelete("saved-jobs/{id}")]
        public async Task<IActionResult> UnsaveJob(Guid id)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString)) return Unauthorized();

            var candidateId = Guid.Parse(userIdString);
            var result = await _candidateService.UnsaveJobAsync(id, candidateId);

            if (!result) return BadRequest("Could not unsave the job.");
            return Ok(new { message = "Job removed from saved list." });
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
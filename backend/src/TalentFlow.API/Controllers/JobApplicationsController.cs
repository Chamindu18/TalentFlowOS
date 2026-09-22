using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalentFlow.Application.Services;
using System.Security.Claims;
using TalentFlow.Application.DTOs.Applications;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class JobApplicationsController : ControllerBase
{
    private readonly IApplicationService _applicationService;
    private readonly ApplicationDbContext _context;

    public JobApplicationsController(IApplicationService applicationService, ApplicationDbContext context)
    {
        _applicationService = applicationService;
        _context = context;
    }

    /// <summary>
    /// Get all applications
    /// </summary>
    [HttpGet]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> GetAll()
    {
        var applications = await _applicationService.GetAllAsync();
        return Ok(new { success = true, data = applications });
    }

    /// <summary>
    /// Get applications for the authenticated user's company (Recruiter)
    /// </summary>
    [HttpGet("my-company")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> GetByMyCompany()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        // Get the user's company ID
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
        if (user == null || user.CompanyId == null)
            return Forbid("User not associated with a company.");

        var applications = await _applicationService.GetApplicationsByCompanyIdAsync(user.CompanyId.Value);
        return Ok(new { success = true, data = applications });
    }

    /// <summary>
    /// Get application by ID - Candidate owns it, or Recruiter/Admin for their company
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
        if (user == null)
            return Unauthorized();

        var application = await _applicationService.GetByIdAsync(id);
        
        // Check ownership via database queries
        var isCandidateOwner = false;
        var isCompanyRecruiter = false;

        if (user.Role == TalentFlow.Domain.Enums.UserRole.Candidate)
        {
            var candidate = await _context.Candidates.FirstOrDefaultAsync(c => c.UserId == userId);
            isCandidateOwner = candidate != null && application.CandidateId == candidate.Id;
        }
        else if (user.Role == TalentFlow.Domain.Enums.UserRole.Recruiter || user.Role == TalentFlow.Domain.Enums.UserRole.Admin)
        {
            if (user.CompanyId.HasValue)
            {
                var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == application.JobId);
                isCompanyRecruiter = job != null && job.CompanyId == user.CompanyId.Value;
            }
        }

        if (!isCandidateOwner && !isCompanyRecruiter)
            return Forbid("You are not authorized to view this application.");

        return Ok(new { success = true, data = application });
    }

    /// <summary>
    /// Get applications by candidate - Only the candidate themselves or Admin
    /// </summary>
    [HttpGet("candidate/{candidateId}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetByCandidate(Guid candidateId)
    {
        var applications = await _applicationService.GetByCandidateIdAsync(candidateId);
        return Ok(new { success = true, data = applications });
    }

    /// <summary>
    /// Get applications by job - Recruiter/Admin for their company only
    /// </summary>
    [HttpGet("job/{jobId}")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> GetByJob(Guid jobId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
        if (user == null || user.CompanyId == null)
            return Forbid("User not associated with a company.");

        var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == jobId);
        if (job == null || job.CompanyId != user.CompanyId.Value)
            return Forbid("You are not authorized to view applications for this job.");

        var applications = await _applicationService.GetByJobIdAsync(jobId);
        return Ok(new { success = true, data = applications });
    }

    /// <summary>
    /// Get applications by status - Recruiter/Admin only
    /// </summary>
    [HttpGet("status/{status}")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> GetByStatus(string status)
    {
        var applications = await _applicationService.GetApplicationsByStatusAsync(status);
        return Ok(new { success = true, data = applications });
    }

    /// <summary>
    /// Submit a new application
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Candidate")]
    public async Task<IActionResult> Create(
        [FromBody] CreateApplicationRequestDTO request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized();
        }

        var application =
            await _applicationService.CreateAsync(
                request,
                userId
            );

        return CreatedAtAction(
            nameof(GetById),
            new { id = application.Id },
            new
            {
                success = true,
                message = "Application submitted successfully",
                data = application
            });
    }

    /// <summary>
    /// Update application status
    /// </summary>
    [HttpPatch("{id}/status")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateApplicationStatusRequestDTO request)
    {
        var application = await _applicationService.UpdateStatusAsync(id, request);
        return Ok(new { success = true, message = "Application status updated", data = application });
    }

    /// <summary>
    /// Shortlist a candidate
    /// </summary>
    [HttpPatch("{id}/shortlist")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> Shortlist(Guid id)
    {
        await _applicationService.ShortlistApplicationAsync(id);
        return Ok(new { success = true, message = "Candidate shortlisted successfully" });
    }

    /// <summary>
    /// Delete an application
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _applicationService.DeleteAsync(id);
        return Ok(new { success = true, message = "Application deleted successfully" });
    }

    /// <summary>
    /// Check if candidate already applied - Candidate can check their own, Recruiter/Admin for their company
    /// </summary>
    [HttpGet("has-applied")]
    public async Task<IActionResult> HasApplied([FromQuery] Guid candidateId, [FromQuery] Guid jobId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
        if (user == null)
            return Unauthorized();

        // Candidate can only check their own applications
        if (user.Role == TalentFlow.Domain.Enums.UserRole.Candidate)
        {
            var candidate = await _context.Candidates.FirstOrDefaultAsync(c => c.UserId == userId);
            if (candidate == null || candidate.Id != candidateId)
                return Forbid("You can only check your own applications.");
        }
        // Recruiter/Admin can check for their company's jobs
        else if (user.Role == TalentFlow.Domain.Enums.UserRole.Recruiter || user.Role == TalentFlow.Domain.Enums.UserRole.Admin)
        {
            if (user.CompanyId == null)
                return Forbid("User not associated with a company.");

            var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == jobId);
            if (job == null || job.CompanyId != user.CompanyId.Value)
                return Forbid("You are not authorized to check applications for this job.");
        }
        else
        {
            return Forbid("Unauthorized role.");
        }

        var hasApplied = await _applicationService.HasCandidateAppliedAsync(candidateId, jobId);
        return Ok(new { success = true, data = hasApplied });
    }

    /// <summary>
    /// Get application count for a job - Recruiter/Admin for their company only
    /// </summary>
    [HttpGet("count/job/{jobId}")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> GetCountForJob(Guid jobId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
        if (user == null || user.CompanyId == null)
            return Forbid("User not associated with a company.");

        var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == jobId);
        if (job == null || job.CompanyId != user.CompanyId.Value)
            return Forbid("You are not authorized to view application count for this job.");

        var count = await _applicationService.GetApplicationCountForJobAsync(jobId);
        return Ok(new { success = true, data = count });
    }

    [HttpGet("my")]
    [Authorize(Roles = "Candidate")]
    public async Task<IActionResult> GetMyApplications()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var applications =
            await _applicationService.GetMyApplicationsAsync(userId);

        return Ok(new
        {
            success = true,
            data = applications
        });
    }

    /// <summary>
    /// Get applications for the authenticated user's company (HiringManager)
    /// </summary>
    [HttpGet("company")]
    [Authorize(Roles = "HiringManager")]
    public async Task<IActionResult> GetByCompany()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        // Get the user's company ID
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
        if (user == null || user.CompanyId == null)
            return Forbid("User not associated with a company.");

        var applications = await _applicationService.GetApplicationsByCompanyIdAsync(user.CompanyId.Value);
        return Ok(new { success = true, data = applications });
    }
}

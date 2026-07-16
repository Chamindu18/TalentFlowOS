using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TalentFlow.Application.Services;
using System.Security.Claims;

using TalentFlow.Application.DTOs.Applications;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class JobApplicationsController : ControllerBase
{
    private readonly IApplicationService _applicationService;

    public JobApplicationsController(IApplicationService applicationService)
    {
        _applicationService = applicationService;
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
    /// Get application by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var application = await _applicationService.GetByIdAsync(id);
        return Ok(new { success = true, data = application });
    }

    /// <summary>
    /// Get applications by candidate
    /// </summary>
    [HttpGet("candidate/{candidateId}")]
    public async Task<IActionResult> GetByCandidate(Guid candidateId)
    {
        var applications = await _applicationService.GetByCandidateIdAsync(candidateId);
        return Ok(new { success = true, data = applications });
    }

    /// <summary>
    /// Get applications by job
    /// </summary>
    [HttpGet("job/{jobId}")]
    public async Task<IActionResult> GetByJob(Guid jobId)
    {
        var applications = await _applicationService.GetByJobIdAsync(jobId);
        return Ok(new { success = true, data = applications });
    }

    /// <summary>
    /// Get applications by status
    /// </summary>
    [HttpGet("status/{status}")]
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
    /// Check if candidate already applied
    /// </summary>
    [HttpGet("has-applied")]
    public async Task<IActionResult> HasApplied([FromQuery] Guid candidateId, [FromQuery] Guid jobId)
    {
        var hasApplied = await _applicationService.HasCandidateAppliedAsync(candidateId, jobId);
        return Ok(new { success = true, data = hasApplied });
    }

    /// <summary>
    /// Get application count for a job
    /// </summary>
    [HttpGet("count/job/{jobId}")]
    public async Task<IActionResult> GetCountForJob(Guid jobId)
    {
        var count = await _applicationService.GetApplicationCountForJobAsync(jobId);
        return Ok(new { success = true, data = count });
    }
}

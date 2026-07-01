using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TalentFlow.Application.DTOs.Jobs;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class JobsController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobsController(IJobService jobService)
    {
        _jobService = jobService;
    }

    /// <summary>
    /// Get all jobs
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var jobs = await _jobService.GetAllAsync();
        return Ok(new { success = true, data = jobs });
    }

    /// <summary>
    /// Get active jobs
    /// </summary>
    [HttpGet("active")]
    public async Task<IActionResult> GetActive()
    {
        var jobs = await _jobService.GetActiveJobsAsync();
        return Ok(new { success = true, data = jobs });
    }

    /// <summary>
    /// Get job by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var job = await _jobService.GetByIdAsync(id);
        return Ok(new { success = true, data = job });
    }

    /// <summary>
    /// Get jobs by company
    /// </summary>
    [HttpGet("company/{companyId}")]
    public async Task<IActionResult> GetByCompany(Guid companyId)
    {
        var jobs = await _jobService.GetJobsByCompanyAsync(companyId);
        return Ok(new { success = true, data = jobs });
    }

    /// <summary>
    /// Get jobs by department
    /// </summary>
    [HttpGet("department/{departmentId}")]
    public async Task<IActionResult> GetByDepartment(Guid departmentId)
    {
        var jobs = await _jobService.GetJobsByDepartmentAsync(departmentId);
        return Ok(new { success = true, data = jobs });
    }

    /// <summary>
    /// Search jobs
    /// </summary>
    [HttpGet("search")]
    public async Task<IActionResult> Search(
        [FromQuery] string? searchTerm,
        [FromQuery] string? location,
        [FromQuery] string? employmentType)
    {
        var jobs = await _jobService.SearchJobsAsync(searchTerm, location, employmentType);
        return Ok(new { success = true, data = jobs });
    }

    /// <summary>
    /// Create a new job
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> Create([FromBody] CreateJobRequestDTO request)
    {
        var job = await _jobService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = job.Id },
            new { success = true, message = "Job created successfully", data = job });
    }

    /// <summary>
    /// Update an existing job
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateJobRequestDTO request)
    {
        var job = await _jobService.UpdateAsync(id, request);
        return Ok(new { success = true, message = "Job updated successfully", data = job });
    }

    /// <summary>
    /// Delete a job (soft delete)
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _jobService.DeleteAsync(id);
        return Ok(new { success = true, message = "Job deleted successfully" });
    }

    /// <summary>
    /// Close a job
    /// </summary>
    [HttpPatch("{id}/close")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> Close(Guid id)
    {
        await _jobService.CloseJobAsync(id);
        return Ok(new { success = true, message = "Job closed successfully" });
    }
}
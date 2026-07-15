using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TalentFlow.Application.DTOs.Jobs;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobsController(IJobService jobService)
    {
        _jobService = jobService;
    }

    // Get all jobs (Public access)
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var jobs = await _jobService.GetAllAsync();
        return Ok(new { success = true, data = jobs });
    }

    // Get active jobs (Public access)
    [HttpGet("active")]
    public async Task<IActionResult> GetActive()
    {
        var jobs = await _jobService.GetActiveJobsAsync();
        return Ok(new { success = true, data = jobs });
    }

    // Get job by ID (Public access)
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var job = await _jobService.GetByIdAsync(id);
        if (job == null) return NotFound(new { success = false, message = "Job not found" });
        return Ok(new { success = true, data = job });
    }

    // Get jobs by company (Public access)
    [HttpGet("company/{companyId}")]
    public async Task<IActionResult> GetByCompany(Guid companyId)
    {
        var jobs = await _jobService.GetJobsByCompanyAsync(companyId);
        return Ok(new { success = true, data = jobs });
    }

    // Get jobs by department (Public access)
    [HttpGet("department/{departmentId}")]
    public async Task<IActionResult> GetByDepartment(Guid departmentId)
    {
        var jobs = await _jobService.GetJobsByDepartmentAsync(departmentId);
        return Ok(new { success = true, data = jobs });
    }

    // Search jobs (Public access)
    [HttpGet("search")]
    public async Task<IActionResult> Search(
        [FromQuery] string? searchTerm,
        [FromQuery] string? location,
        [FromQuery] string? employmentType)
    {
        var jobs = await _jobService.SearchJobsAsync(searchTerm, location, employmentType);
        return Ok(new { success = true, data = jobs });
    }

    // Create a new job (Admin/Recruiter only)
    [HttpPost]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> Create([FromBody] CreateJobRequestDTO request)
    {
        var job = await _jobService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = job.Id },
            new { success = true, message = "Job created successfully", data = job });
    }

    // Update an existing job (Admin/Recruiter only)
    [HttpPut("{id}")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateJobRequestDTO request)
    {
        var job = await _jobService.UpdateAsync(id, request);
        return Ok(new { success = true, message = "Job updated successfully", data = job });
    }

    // Delete a job (Admin/Recruiter only)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _jobService.DeleteAsync(id);
        return Ok(new { success = true, message = "Job deleted successfully" });
    }

    // Close a job (Admin/Recruiter only)
    [HttpPatch("{id}/close")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> Close(Guid id)
    {
        await _jobService.CloseJobAsync(id);
        return Ok(new { success = true, message = "Job closed successfully" });
    }
}
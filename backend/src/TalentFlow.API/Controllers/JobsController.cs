using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TalentFlow.Application.DTOs.Jobs;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly IJobService _jobService;
    private readonly ApplicationDbContext _context;

    public JobsController(IJobService jobService, ApplicationDbContext context)
    {
        _jobService = jobService;
        _context = context;
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

    // Get jobs for authenticated user's company (Recruiter/Admin)
    [HttpGet("my-company")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> GetByMyCompany()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
        if (user == null || user.CompanyId == null)
            return Forbid("User not associated with a company.");

        var jobs = await _jobService.GetJobsByCompanyAsync(user.CompanyId.Value);
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
        // Get the authenticated user's company ID
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
        // Admin can create jobs for any company, Recruiter only for their own
        Guid? userCompanyId = null;
        if (user != null && !User.IsInRole("Admin"))
        {
            if (user.CompanyId == null)
                return Forbid("User not associated with a company.");
            userCompanyId = user.CompanyId.Value;
        }

        var job = await _jobService.CreateAsync(request, userCompanyId);
        return CreatedAtAction(nameof(GetById), new { id = job.Id },
            new { success = true, message = "Job created successfully", data = job });
    }

    // Update an existing job (Admin/Recruiter only)
    [HttpPut("{id}")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateJobRequestDTO request)
    {
        // Get the authenticated user's company ID
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
        // Admin can update jobs for any company, Recruiter only for their own
        Guid? userCompanyId = null;
        if (user != null && !User.IsInRole("Admin"))
        {
            if (user.CompanyId == null)
                return Forbid("User not associated with a company.");
            userCompanyId = user.CompanyId.Value;
        }

        var job = await _jobService.UpdateAsync(id, request, userCompanyId);
        return Ok(new { success = true, message = "Job updated successfully", data = job });
    }

    // Delete a job (Admin/Recruiter only)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> Delete(Guid id)
    {
        // Get the authenticated user's company ID
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
        Guid? userCompanyId = null;
        if (user != null && !User.IsInRole("Admin"))
        {
            if (user.CompanyId == null)
                return Forbid("User not associated with a company.");
            userCompanyId = user.CompanyId.Value;
        }

        await _jobService.DeleteAsync(id, userCompanyId);
        return Ok(new { success = true, message = "Job deleted successfully" });
    }

    // Close a job (Admin/Recruiter only)
    [HttpPatch("{id}/close")]
    [Authorize(Roles = "Recruiter,Admin")]
    public async Task<IActionResult> Close(Guid id)
    {
        // Get the authenticated user's company ID
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
        Guid? userCompanyId = null;
        if (user != null && !User.IsInRole("Admin"))
        {
            if (user.CompanyId == null)
                return Forbid("User not associated with a company.");
            userCompanyId = user.CompanyId.Value;
        }

        await _jobService.CloseJobAsync(id, userCompanyId);
        return Ok(new { success = true, message = "Job closed successfully" });
    }
}
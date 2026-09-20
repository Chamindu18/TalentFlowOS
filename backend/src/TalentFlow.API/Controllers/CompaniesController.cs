using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TalentFlow.Application.DTOs.Companies;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CompaniesController : ControllerBase
{
    private readonly ICompanyService _companyService;
    private readonly ApplicationDbContext _context;

    public CompaniesController(ICompanyService companyService, ApplicationDbContext context)
    {
        _companyService = companyService;
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var companies = await _companyService.GetAllAsync();
        return Ok(new { success = true, data = companies });
    }

    [HttpGet("my-company")]
    public async Task<IActionResult> GetMyCompany()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
        if (user == null || user.CompanyId == null)
            return NotFound("User not associated with a company.");

        var company = await _companyService.GetByIdAsync(user.CompanyId.Value);
        return Ok(new { success = true, data = company });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var company = await _companyService.GetByIdAsync(id);
        return Ok(new { success = true, data = company });
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CreateCompanyRequestDTO request)
    {
        var company = await _companyService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = company.Id },
            new { success = true, message = "Company created successfully", data = company });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateCompanyRequestDTO request)
    {
        var company = await _companyService.UpdateAsync(id, request);
        return Ok(new { success = true, message = "Company updated successfully", data = company });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _companyService.DeleteAsync(id);
        return Ok(new { success = true, message = "Company deleted successfully" });
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string? searchTerm)
    {
        var companies = await _companyService.SearchAsync(searchTerm);
        return Ok(new { success = true, data = companies });
    }
}

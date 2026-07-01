using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TalentFlow.Application.DTOs.Companies;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CompaniesController : ControllerBase
{
    private readonly ICompanyService _companyService;

    public CompaniesController(ICompanyService companyService)
    {
        _companyService = companyService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var companies = await _companyService.GetAllAsync();
        return Ok(new { success = true, data = companies });
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

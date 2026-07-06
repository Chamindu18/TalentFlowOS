using Microsoft.AspNetCore.Mvc;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;

    public AdminController(
        IAdminService adminService
    )
    {
        _adminService = adminService;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        var stats =
            await _adminService.GetDashboardStatsAsync();

        return Ok(
            new
            {
                success = true,
                data = stats
            }
        );
    }
}
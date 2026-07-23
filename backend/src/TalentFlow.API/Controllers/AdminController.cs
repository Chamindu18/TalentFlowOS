using Microsoft.AspNetCore.Mvc;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Application.DTOs.Users;
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

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        var users =
            await _adminService.GetAllUsersAsync();

        return Ok(new
        {
            success = true,
            data = users
        });
    }

    [HttpPut("users/{id}/role")]
    public async Task<IActionResult>
     UpdateUserRole(
         Guid id,
         UpdateUserRoleDto dto)
    {
        var result =
            await _adminService
                .UpdateUserRoleAsync(
                    id,
                    dto.Role);

        if (!result)
        {
            return BadRequest();
        }

        return Ok(new
        {
            success = true,
            message = "Role updated successfully"
        });
    }

    [HttpPut("users/{id}/disable")]
    public async Task<IActionResult>
    DisableUser(Guid id)
    {
        var result =
            await _adminService
                .DisableUserAsync(id);

        if (!result)
        {
            return BadRequest();
        }

        return Ok(new
        {
            success = true,
            message = "User disabled successfully"
        });
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class ActivityLogController : ControllerBase
{
    [HttpGet]
    public IActionResult GetLogs()
    {
        return Ok(new
        {
            success = true,
            data = Array.Empty<object>()
        });
    }
}
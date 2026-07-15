using Microsoft.AspNetCore.Mvc;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivityLogController : ControllerBase
{
    [HttpGet]
    public IActionResult GetLogs()
    {
        var logs = new[]
        {
            new
            {
                Action = "User Login",
                Timestamp = DateTime.UtcNow
            },
            new
            {
                Action = "Job Created",
                Timestamp = DateTime.UtcNow
            },
            new
            {
                Action = "Application Submitted",
                Timestamp = DateTime.UtcNow
            }
        };

        return Ok(new
        {
            success = true,
            data = logs
        });
    }
}
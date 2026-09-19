using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class NotificationController : ControllerBase
{
    [HttpGet]
    public IActionResult GetNotifications()
    {
        var notifications = new[]
        {
            new
            {
                id = 1,
                title = "Candidate Applied",
                message = "A new candidate application was submitted.",
                createdAt = DateTime.UtcNow
            },
            new
            {
                id = 2,
                title = "Interview Scheduled",
                message = "An interview has been scheduled.",
                createdAt = DateTime.UtcNow
            }
        };

        return Ok(new
        {
            success = true,
            data = notifications
        });
    }

    [HttpPost]
    public IActionResult CreateNotification()
    {
        return Ok(new
        {
            success = true,
            message = "Notification created successfully"
        });
    }
}
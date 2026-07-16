using Microsoft.AspNetCore.Mvc;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationController : ControllerBase
{
    [HttpGet]
    public IActionResult GetNotifications()
    {
        var notifications = new[]
        {
            new
            {
                Id = 1,
                Title = "Candidate Applied",
                Message = "A new candidate application was submitted.",
                CreatedAt = DateTime.UtcNow
            },
            new
            {
                Id = 2,
                Title = "Interview Scheduled",
                Message = "An interview has been scheduled.",
                CreatedAt = DateTime.UtcNow
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
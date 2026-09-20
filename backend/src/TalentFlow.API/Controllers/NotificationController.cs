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
        return Ok(new
        {
            success = true,
            data = Array.Empty<object>()
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
using Microsoft.AspNetCore.Mvc;

using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    private readonly IEmailService _emailService;

    public EmailController(
        IEmailService emailService
    )
    {
        _emailService = emailService;
    }

    [HttpPost("test")]
    public async Task<IActionResult> SendTestEmail()
    {
        await _emailService.SendEmailAsync(
            "chamindu553@gmail.com",
            "TalentFlow Email Test",
            """
            <h2>TalentFlow Email Service Working!</h2>

            <p>
                Congratulations! Your SMTP configuration is working correctly.
            </p>

            <p>
                Next step: Welcome emails and forgot password.
            </p>
            """
        );

        return Ok(
            new
            {
                message = "Test email sent successfully."
            }
        );
    }
}
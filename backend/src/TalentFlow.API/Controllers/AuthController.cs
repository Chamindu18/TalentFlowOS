using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using TalentFlow.Application.DTOs.Auth;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(
        IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        [FromBody] RegisterRequestDto request)
    {
        var response =
            await _authService.RegisterAsync(
                request
            );

        return Ok(response);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        [FromBody] LoginRequestDto request)
    {
        var response =
            await _authService.LoginAsync(
                request
            );

        return Ok(response);
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(
        [FromBody] ForgotPasswordRequestDto request)
    {
        await _authService.ForgotPasswordAsync(
            request
        );

        return Ok(new
        {
            Message =
                "If an account exists, a password reset email has been sent."
        });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(
        [FromBody] ResetPasswordRequestDto request)
    {
        await _authService.ResetPasswordAsync(
            request
        );

        return Ok(new
        {
            Message =
                "Password reset successfully."
        });
    }

    [HttpGet("verify-email")]
    public async Task<IActionResult> VerifyEmail(
        [FromQuery] string token
    )
    {
        await _authService.VerifyEmailAsync(
            token
        );

        return Ok(new
        {
            Message =
                "Email verified successfully."
        });
    }

    [HttpPost("resend-verification")]
    public async Task<IActionResult> ResendVerification(
        [FromBody]
        ResendVerificationRequestDto request
    )
    {
        await _authService
            .ResendVerificationEmailAsync(
                request.Email
            );

        return Ok(new
        {
            Message =
                "Verification email sent successfully."
        });
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        return Ok(new
        {
            UserId =
                User.FindFirst("sub")?.Value,

            Email =
                User.FindFirst("email")?.Value,

            Role =
                User.FindFirst(
                    System.Security.Claims
                        .ClaimTypes.Role
                )?.Value
        });
    }
}
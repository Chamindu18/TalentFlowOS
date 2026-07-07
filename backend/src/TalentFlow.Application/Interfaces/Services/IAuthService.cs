using TalentFlow.Application.DTOs.Auth;

namespace TalentFlow.Application.Interfaces.Services;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(
        RegisterRequestDto request
    );

    Task<AuthResponseDto> LoginAsync(
        LoginRequestDto request
    );

    Task ForgotPasswordAsync(
        ForgotPasswordRequestDto request
    );

    Task ResetPasswordAsync(
        ResetPasswordRequestDto request
    );
}
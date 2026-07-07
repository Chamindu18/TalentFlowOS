using TalentFlow.Application.DTOs.Auth;

namespace TalentFlow.Application.Interfaces.Auth;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request);

    Task<AuthResponseDto> LoginAsync(LoginRequestDto request);
}
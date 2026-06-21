namespace TalentFlow.Application.DTOs.Auth;

public class AuthResponseDto
{
    public string AccessToken { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }
}
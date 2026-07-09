using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Application.DTOs.Auth;

public class ResendVerificationRequestDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;
}
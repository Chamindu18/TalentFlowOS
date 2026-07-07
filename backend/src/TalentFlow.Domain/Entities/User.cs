using TalentFlow.Domain.Enums;

namespace TalentFlow.Domain.Entities;

public class User
{
    public Guid Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public UserRole Role { get; set; }

    // =====================================
    // Email Verification
    // =====================================

    public bool IsEmailVerified { get; set; }

    public string? EmailVerificationToken { get; set; }

    public DateTime? EmailVerificationTokenExpiresAt { get; set; }

    // =====================================
    // Password Reset
    // =====================================

    public string? ResetPasswordToken { get; set; }

    public DateTime? ResetPasswordTokenExpiresAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
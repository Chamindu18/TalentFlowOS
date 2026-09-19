using FluentValidation;
using TalentFlow.Application.DTOs.Auth;
using TalentFlow.Domain.Enums;

namespace TalentFlow.Application.Validators.Auth;

public class RegisterRequestDtoValidator
    : AbstractValidator<RegisterRequestDto>
{
    public RegisterRequestDtoValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty()
            .WithMessage("First name is required.")
            .MaximumLength(50)
            .WithMessage(
                "First name cannot exceed 50 characters."
            );

        RuleFor(x => x.LastName)
            .NotEmpty()
            .WithMessage("Last name is required.")
            .MaximumLength(50)
            .WithMessage(
                "Last name cannot exceed 50 characters."
            );

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Invalid email format.");

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("Password is required.")
            .MinimumLength(8)
            .WithMessage(
                "Password must be at least 8 characters long."
            )
            .Matches(@"[A-Z]")
            .WithMessage(
                "Password must contain at least one uppercase letter."
            )
            .Matches(@"[a-z]")
            .WithMessage(
                "Password must contain at least one lowercase letter."
            )
            .Matches(@"\d")
            .WithMessage(
                "Password must contain at least one number."
            );

        // Role is ignored server-side (always Candidate), but accept if sent for backward compatibility
        RuleFor(x => x.Role)
            .Must(role => role == UserRole.Candidate || role == UserRole.Recruiter)
            .WithMessage("Invalid role.")
            .When(x => x.Role != UserRole.Candidate && x.Role != UserRole.Recruiter && x.Role != default);
    }
}
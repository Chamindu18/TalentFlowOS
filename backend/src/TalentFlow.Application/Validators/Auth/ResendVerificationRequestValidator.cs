using FluentValidation;
using TalentFlow.Application.DTOs.Auth;

namespace TalentFlow.Application.Validators.Auth;

public class ResendVerificationRequestDtoValidator
    : AbstractValidator<ResendVerificationRequestDto>
{
    public ResendVerificationRequestDtoValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Invalid email format.");
    }
}
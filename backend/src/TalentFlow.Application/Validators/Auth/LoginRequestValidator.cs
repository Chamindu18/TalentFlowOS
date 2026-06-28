using FluentValidation;
using TalentFlow.Application.DTOs.Auth;

namespace TalentFlow.Application.Validators.Auth;

public class LoginRequestDtoValidator
    : AbstractValidator<LoginRequestDto>
{
    public LoginRequestDtoValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Invalid email format.");

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("Password is required.");
    }
}
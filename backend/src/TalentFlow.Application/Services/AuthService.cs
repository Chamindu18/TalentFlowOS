using Microsoft.Extensions.Options;
using TalentFlow.Application.Common.Settings;
using TalentFlow.Application.Common.Templates;
using TalentFlow.Application.DTOs.Auth;
using TalentFlow.Application.Exceptions.Auth;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Security;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Domain.Entities;
using TalentFlow.Domain.Enums;

namespace TalentFlow.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IEmailService _emailService;
    private readonly FrontendSettings _frontendSettings;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator,
        IEmailService emailService,
        IOptions<FrontendSettings> frontendSettings)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
        _emailService = emailService;
        _frontendSettings = frontendSettings.Value;
    }

    public async Task<CurrentUserDto> GetCurrentUserAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);

        if (user == null)
            throw new InvalidCredentialsException();

        return new CurrentUserDto
        {
            UserId = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Role = user.Role.ToString()
        };
    }

    public async Task<AuthResponseDto> RegisterAsync(
        RegisterRequestDto request)
    {
        var email = request.Email
            .Trim()
            .ToLower();

        var userExists = await _userRepository.ExistsAsync(
            email
        );

        if (userExists)
        {
            throw new UserAlreadyExistsException(
                email
            );
        }

        var user = new User
        {
            Id = Guid.NewGuid(),

            FirstName = request.FirstName,

            LastName = request.LastName,

            Email = email,

            PasswordHash =
                _passwordHasher.HashPassword(
                    request.Password
                ),

            Role = request.Role,

            CreatedAt = DateTime.UtcNow,

            UpdatedAt = DateTime.UtcNow,

            IsEmailVerified = false,

            EmailVerificationToken = GenerateVerificationToken(),

            EmailVerificationTokenExpiresAt =
                DateTime.UtcNow.AddHours(24)
        };

        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();

        await SendVerificationEmailAsync(user);

        return new AuthResponseDto
        {
            Token = string.Empty,

            UserId = user.Id,

            Email = user.Email,

            FirstName = user.FirstName,

            LastName = user.LastName,

            Role = user.Role.ToString()
        };
    }

    public async Task<AuthResponseDto> LoginAsync(
        LoginRequestDto request)
    {
        var normalizedEmail = request.Email
            .Trim()
            .ToLower();

        var user =
            await _userRepository.GetByEmailAsync(
                normalizedEmail
            );

        if (user is null)
        {
            throw new InvalidCredentialsException();
        }

        var isValidPassword =
            _passwordHasher.VerifyPassword(
                request.Password,
                user.PasswordHash
            );

        if (!isValidPassword)
        {
            throw new InvalidCredentialsException();
        }

        if (!user.IsEmailVerified)
        {
            throw new EmailNotVerifiedException();
        }

        var token =
            _jwtTokenGenerator.GenerateToken(
                user
            );

        return new AuthResponseDto
        {
            Token = token,

            UserId = user.Id,

            Email = user.Email,

            FirstName = user.FirstName,

            LastName = user.LastName,

            Role = user.Role.ToString()
        };
    }

    public async Task ForgotPasswordAsync(
        ForgotPasswordRequestDto request)
    {
        var user =
            await _userRepository.GetByEmailAsync(
                request.Email
                    .Trim()
                    .ToLower()
            );

        // Prevent email enumeration attacks
        if (user is null)
        {
            return;
        }

        var token = Guid.NewGuid().ToString();

        user.ResetPasswordToken = token;

        user.ResetPasswordTokenExpiresAt =
            DateTime.UtcNow.AddMinutes(15);

        user.UpdatedAt = DateTime.UtcNow;

        await _userRepository.SaveChangesAsync();

        var resetLink =
            $"{_frontendSettings.BaseUrl}/reset-password?token={token}";

        var body =
            EmailTemplates.ResetPassword(
                user.FirstName,
                resetLink
            );

        await _emailService.SendEmailAsync(
            user.Email,
            "Reset Your TalentFlow Password 🔒",
            body
        );
    }

    public async Task ResetPasswordAsync(
        ResetPasswordRequestDto request)
    {
        var user =
            await _userRepository.GetByResetTokenAsync(
                request.Token
            );

        if (user is null)
        {
            throw new InvalidResetPasswordTokenException();
        }

        if (
            user.ResetPasswordTokenExpiresAt is null ||
            user.ResetPasswordTokenExpiresAt <
            DateTime.UtcNow
        )
        {
            throw new ExpiredResetPasswordTokenException();
        }

        user.PasswordHash =
            _passwordHasher.HashPassword(
                request.NewPassword
            );

        user.ResetPasswordToken = null;

        user.ResetPasswordTokenExpiresAt = null;

        user.UpdatedAt = DateTime.UtcNow;

        await _userRepository.SaveChangesAsync();
    }

    public async Task VerifyEmailAsync(string token)
    {
        if (string.IsNullOrWhiteSpace(token))
        {
            throw new InvalidVerificationTokenException();
        }

        var user =
            await _userRepository.GetByEmailVerificationTokenAsync(
                token
            );

        if (user is null)
        {
            throw new InvalidVerificationTokenException();
        }

        if (
            user.EmailVerificationTokenExpiresAt is null ||
            user.EmailVerificationTokenExpiresAt <
            DateTime.UtcNow
        )
        {
            throw new ExpiredVerificationTokenException();
        }

        if (user.IsEmailVerified)
        {
            return;
        }

        user.IsEmailVerified = true;

        user.EmailVerificationToken = null;

        user.EmailVerificationTokenExpiresAt = null;

        user.UpdatedAt = DateTime.UtcNow;

        await _userRepository.SaveChangesAsync();

        await SendWelcomeEmailAsync(user);
    }

    public async Task ResendVerificationEmailAsync(string email)
    {
        var user =
            await _userRepository.GetByEmailAsync(
                email.Trim().ToLower()
            );

        if (user is null)
        {
            return;
        }

        if (user.IsEmailVerified)
        {
            return;
        }

        user.EmailVerificationToken = GenerateVerificationToken();

        user.EmailVerificationTokenExpiresAt =
            DateTime.UtcNow.AddHours(24);

        user.UpdatedAt = DateTime.UtcNow;

        await _userRepository.SaveChangesAsync();

        await SendVerificationEmailAsync(user);
    }

    private async Task SendVerificationEmailAsync(User user)
    {
        try
        {
            var verificationLink =
                $"{_frontendSettings.BaseUrl}/email-verification?token={user.EmailVerificationToken}";

            var body =
                EmailTemplates.EmailVerification(
                    user.FirstName,
                    verificationLink
                );

            await _emailService.SendEmailAsync(
                user.Email,
                "Verify Your Email Address - TalentFlow ✅",
                body
            );
        }
        catch
        {
            // Email sending should not
            // prevent registration.
        }
            }

    private async Task SendWelcomeEmailAsync(User user)
    {
        try
        {
            string subject;
            string body;

            switch (user.Role)
            {
                case UserRole.Candidate:
                    subject =
                        "Welcome to TalentFlow OS 🚀";

                    body =
                        EmailTemplates.CandidateWelcome(
                            user.FirstName
                        );

                    break;

                case UserRole.Recruiter:
                    subject =
                        "Welcome to TalentFlow OS 🎯";

                    body =
                        EmailTemplates.RecruiterWelcome(
                            user.FirstName
                        );

                    break;

                case UserRole.HiringManager:
                    subject =
                        "Welcome to TalentFlow OS 🏢";

                    body =
                        EmailTemplates.HiringManagerWelcome(
                            user.FirstName
                        );

                    break;

                case UserRole.Admin:
                    subject =
                        "Welcome to TalentFlow OS ⚙️";

                    body =
                        EmailTemplates.AdminWelcome(
                            user.FirstName
                        );

                    break;

                default:
                    subject =
                        "Welcome to TalentFlow OS";

                    body =
                        $"""
                        <h2>
                            Welcome, {user.FirstName}!
                        </h2>
                        """;

                    break;
            }

            await _emailService.SendEmailAsync(
                user.Email,
                subject,
                body
            );
        }
        catch
        {
            // Email sending should not
            // prevent authentication flow.
        }
    }

    private string GenerateVerificationToken()
    {
        return Guid.NewGuid().ToString();
    }
}
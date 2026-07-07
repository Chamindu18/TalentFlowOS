using TalentFlow.Application.Common.Templates;
using TalentFlow.Application.DTOs.Auth;
using TalentFlow.Application.Exceptions.Auth;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Security;
using TalentFlow.Application.Interfaces.Services;

using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IEmailService _emailService;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator,
        IEmailService emailService)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
        _emailService = emailService;
    }

    public async Task<AuthResponseDto> RegisterAsync(
        RegisterRequestDto request)
    {
        var userExists = await _userRepository.ExistsAsync(
            request.Email
        );

        if (userExists)
        {
            throw new UserAlreadyExistsException(
                request.Email
            );
        }

        var user = new User
        {
            Id = Guid.NewGuid(),

            FirstName = request.FirstName,

            LastName = request.LastName,

            Email = request.Email
                .Trim()
                .ToLower(),

            PasswordHash =
                _passwordHasher.HashPassword(
                    request.Password
                ),

            Role = request.Role,

            CreatedAt = DateTime.UtcNow,

            UpdatedAt = DateTime.UtcNow
        };

        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();

        try
        {
            string subject;
            string body;

            switch (user.Role.ToString())
            {
                case "Candidate":
                    subject =
                        "Welcome to TalentFlow OS 🚀";

                    body =
                        EmailTemplates.CandidateWelcome(
                            user.FirstName
                        );

                    break;

                case "Recruiter":
                    subject =
                        "Welcome to TalentFlow OS 🎯";

                    body =
                        EmailTemplates.RecruiterWelcome(
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
        catch (Exception ex)
        {
            Console.WriteLine(
                $"Failed to send welcome email: {ex.Message}"
            );
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

    public async Task<AuthResponseDto> LoginAsync(
        LoginRequestDto request)
    {
        var user =
            await _userRepository.GetByEmailAsync(
                request.Email
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
            $"http://localhost:5173/reset-password?token={token}";

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
            throw new Exception(
                "Invalid reset token."
            );
        }

        if (
            user.ResetPasswordTokenExpiresAt is null ||
            user.ResetPasswordTokenExpiresAt <
            DateTime.UtcNow
        )
        {
            throw new Exception(
                "Reset token has expired."
            );
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
}
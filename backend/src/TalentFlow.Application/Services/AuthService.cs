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
        var email = request.Email.Trim().ToLower();
        var userExists = await _userRepository.ExistsAsync(email);

        if (userExists)
        {
            throw new UserAlreadyExistsException(email);
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = email,
            PasswordHash = _passwordHasher.HashPassword(request.Password),
            Role = request.Role,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            IsEmailVerified = false,
            EmailVerificationToken = GenerateVerificationToken(),
            EmailVerificationTokenExpiresAt = DateTime.UtcNow.AddHours(24)
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

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request)
    {
        var normalizedEmail = request.Email.Trim().ToLower();
        var user = await _userRepository.GetByEmailAsync(normalizedEmail);

        if (user is null)
        {
            throw new InvalidCredentialsException();
        }

        var isValidPassword = _passwordHasher.VerifyPassword(request.Password, user.PasswordHash);

        if (!isValidPassword)
        {
            throw new InvalidCredentialsException();
        }

        
        /*
        if (!user.IsEmailVerified)
        {
            throw new EmailNotVerifiedException();
        }
        */

        var token = _jwtTokenGenerator.GenerateToken(user);

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

   
    public async Task ForgotPasswordAsync(ForgotPasswordRequestDto request) { /* ... */ }
    public async Task ResetPasswordAsync(ResetPasswordRequestDto request) { /* ... */ }
    public async Task VerifyEmailAsync(string token) { /* ... */ }
    public async Task ResendVerificationEmailAsync(string email) { /* ... */ }

    private async Task SendVerificationEmailAsync(User user)
    {
        try
        {
            var verificationLink = $"{_frontendSettings.BaseUrl}/email-verification?token={user.EmailVerificationToken}";
            var body = EmailTemplates.EmailVerification(user.FirstName, verificationLink);

            await _emailService.SendEmailAsync(user.Email, "Verify Your Email Address - TalentFlow ✅", body);
        }
        catch { }
    }

    private async Task SendWelcomeEmailAsync(User user)
    {
        try
        {
            
            await _emailService.SendEmailAsync(user.Email, "Welcome", "Welcome body");
        }
        catch { }
    }

    private string GenerateVerificationToken() => Guid.NewGuid().ToString();
}
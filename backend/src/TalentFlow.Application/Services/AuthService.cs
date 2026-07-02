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

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponseDto> RegisterAsync(
        RegisterRequestDto request)
    {
        var userExists = await _userRepository.ExistsAsync(
            request.Email);

        if (userExists)
        {
            throw new UserAlreadyExistsException(
                request.Email);
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email.Trim().ToLower(),
            PasswordHash = _passwordHasher.HashPassword(
                request.Password),

            // Use the role selected during registration
            Role = request.Role,

            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();

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

    public async Task<AuthResponseDto> LoginAsync(
        LoginRequestDto request)
    {
        var user = await _userRepository.GetByEmailAsync(
            request.Email);

        if (user is null)
        {
            throw new InvalidCredentialsException();
        }

        var isValidPassword =
            _passwordHasher.VerifyPassword(
                request.Password,
                user.PasswordHash);

        if (!isValidPassword)
        {
            throw new InvalidCredentialsException();
        }

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
}
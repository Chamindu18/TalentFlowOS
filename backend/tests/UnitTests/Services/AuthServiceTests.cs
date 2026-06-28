using FluentAssertions;
using Moq;
using TalentFlow.Application.DTOs.Auth;
using TalentFlow.Application.Exceptions.Auth;
using TalentFlow.Application.Interfaces.Persistence;
using TalentFlow.Application.Interfaces.Security;
using TalentFlow.Application.Services;
using TalentFlow.Domain.Entities;
using TalentFlow.Domain.Enums;

namespace UnitTests.Services;

public class AuthServiceTests
{
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IPasswordHasher> _passwordHasherMock;
    private readonly Mock<IJwtTokenGenerator> _jwtTokenGeneratorMock;

    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _passwordHasherMock = new Mock<IPasswordHasher>();
        _jwtTokenGeneratorMock = new Mock<IJwtTokenGenerator>();

        _authService = new AuthService(
            _userRepositoryMock.Object,
            _passwordHasherMock.Object,
            _jwtTokenGeneratorMock.Object);
    }

    [Fact]
    public async Task RegisterAsync_ShouldCreateUser_WhenEmailDoesNotExist()
    {
        // Arrange
        var request = new RegisterRequestDto
        {
            FirstName = "Chamindu",
            LastName = "Ranasinghe",
            Email = "chamindu@gmail.com",
            Password = "Password123"
        };

        _userRepositoryMock
            .Setup(x => x.ExistsAsync(request.Email))
            .ReturnsAsync(false);

        _passwordHasherMock
            .Setup(x => x.HashPassword(request.Password))
            .Returns("hashed-password");

        _jwtTokenGeneratorMock
            .Setup(x => x.GenerateToken(It.IsAny<User>()))
            .Returns("jwt-token");

        // Act
        var result = await _authService.RegisterAsync(request);

        // Assert
        result.Should().NotBeNull();
        result.Email.Should().Be("chamindu@gmail.com");
        result.FirstName.Should().Be("Chamindu");
        result.LastName.Should().Be("Ranasinghe");
        result.Role.Should().Be(UserRole.Candidate.ToString());
        result.Token.Should().Be("jwt-token");

        _userRepositoryMock.Verify(
            x => x.AddAsync(It.IsAny<User>()),
            Times.Once);

        _userRepositoryMock.Verify(
            x => x.SaveChangesAsync(),
            Times.Once);
    }

    [Fact]
    public async Task RegisterAsync_ShouldThrow_WhenUserAlreadyExists()
    {
        // Arrange
        var request = new RegisterRequestDto
        {
            FirstName = "Nethmi",
            LastName = "Perera",
            Email = "nethmi@gmail.com",
            Password = "Password123"
        };

        _userRepositoryMock
            .Setup(x => x.ExistsAsync(request.Email))
            .ReturnsAsync(true);

        // Act
        Func<Task> action = async () =>
            await _authService.RegisterAsync(request);

        // Assert
        await action
            .Should()
            .ThrowAsync<UserAlreadyExistsException>();
    }

    [Fact]
    public async Task LoginAsync_ShouldReturnToken_WhenCredentialsAreValid()
    {
        // Arrange
        var request = new LoginRequestDto
        {
            Email = "kasun@gmail.com",
            Password = "Password123"
        };

        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = "Kasun",
            LastName = "Silva",
            Email = request.Email,
            PasswordHash = "hashed-password",
            Role = UserRole.Candidate
        };

        _userRepositoryMock
            .Setup(x => x.GetByEmailAsync(request.Email))
            .ReturnsAsync(user);

        _passwordHasherMock
            .Setup(x => x.VerifyPassword(
                request.Password,
                user.PasswordHash))
            .Returns(true);

        _jwtTokenGeneratorMock
            .Setup(x => x.GenerateToken(user))
            .Returns("jwt-token");

        // Act
        var result = await _authService.LoginAsync(request);

        // Assert
        result.Should().NotBeNull();
        result.Email.Should().Be(user.Email);
        result.FirstName.Should().Be("Kasun");
        result.LastName.Should().Be("Silva");
        result.Token.Should().Be("jwt-token");
        result.Role.Should().Be(UserRole.Candidate.ToString());
    }

    [Fact]
    public async Task LoginAsync_ShouldThrow_WhenPasswordIsInvalid()
    {
        // Arrange
        var request = new LoginRequestDto
        {
            Email = "sachini@gmail.com",
            Password = "WrongPassword"
        };

        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = "Sachini",
            LastName = "Fernando",
            Email = request.Email,
            PasswordHash = "hashed-password",
            Role = UserRole.Candidate
        };

        _userRepositoryMock
            .Setup(x => x.GetByEmailAsync(request.Email))
            .ReturnsAsync(user);

        _passwordHasherMock
            .Setup(x => x.VerifyPassword(
                request.Password,
                user.PasswordHash))
            .Returns(false);

        // Act
        Func<Task> action = async () =>
            await _authService.LoginAsync(request);

        // Assert
        await action
            .Should()
            .ThrowAsync<InvalidCredentialsException>();
    }
}
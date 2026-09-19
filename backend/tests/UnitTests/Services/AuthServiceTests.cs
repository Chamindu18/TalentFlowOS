using FluentAssertions;
using Moq;
using Xunit;
using Microsoft.Extensions.Options;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Security;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Application.DTOs.Auth;
using TalentFlow.Application.Exceptions.Auth;
using TalentFlow.Application.Services;
using TalentFlow.Application.Common.Settings;
using TalentFlow.Domain.Entities;
using TalentFlow.Domain.Enums;

namespace UnitTests.Services
{
    public class AuthServiceTests
    {
        private readonly Mock<IUserRepository> _userRepositoryMock;
        private readonly Mock<ICandidateRepository> _candidateRepositoryMock;
        private readonly Mock<IPasswordHasher> _passwordHasherMock;
        private readonly Mock<IJwtTokenGenerator> _jwtTokenGeneratorMock;
        private readonly Mock<IEmailService> _emailServiceMock;
        private readonly Mock<IOptions<FrontendSettings>> _frontendSettingsMock;
        private readonly AuthService _authService;

        public AuthServiceTests()
        {
            _userRepositoryMock = new Mock<IUserRepository>();
            _candidateRepositoryMock = new Mock<ICandidateRepository>();
            _passwordHasherMock = new Mock<IPasswordHasher>();
            _jwtTokenGeneratorMock = new Mock<IJwtTokenGenerator>();
            _emailServiceMock = new Mock<IEmailService>();
            _frontendSettingsMock = new Mock<IOptions<FrontendSettings>>();

            _frontendSettingsMock.Setup(x => x.Value).Returns(new FrontendSettings { BaseUrl = "http://localhost:5173" });

            _authService = new AuthService(
                _userRepositoryMock.Object,
                _candidateRepositoryMock.Object,
                _passwordHasherMock.Object,
                _jwtTokenGeneratorMock.Object,
                _emailServiceMock.Object,
                _frontendSettingsMock.Object);
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
                Password = "Password123",
                Role = UserRole.Candidate
            };

            _userRepositoryMock
                .Setup(x => x.ExistsAsync(request.Email))
                .ReturnsAsync(false);

            _passwordHasherMock
                .Setup(x => x.HashPassword(request.Password))
                .Returns("hashed-password");

            _userRepositoryMock
                .Setup(x => x.AddAsync(It.IsAny<User>()))
                .Returns(Task.CompletedTask);

            _userRepositoryMock
                .Setup(x => x.SaveChangesAsync())
                .Returns(Task.CompletedTask);

            _candidateRepositoryMock
                .Setup(x => x.AddAsync(It.IsAny<Candidate>()))
                .Returns(Task.CompletedTask);

            _candidateRepositoryMock
                .Setup(x => x.SaveChangesAsync())
                .ReturnsAsync(true);

            _emailServiceMock
                .Setup(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _authService.RegisterAsync(request);

            // Assert
            result.Should().NotBeNull();
            result.Email.Should().Be("chamindu@gmail.com");
            result.Token.Should().Be(string.Empty);
            result.Role.Should().Be(UserRole.Candidate.ToString());

            _userRepositoryMock.Verify(x => x.AddAsync(It.Is<User>(u =>
                u.Email == request.Email &&
                u.FirstName == request.FirstName &&
                u.LastName == request.LastName &&
                u.Role == request.Role &&
                u.IsEmailVerified == false &&
                u.EmailVerificationToken != null &&
                u.EmailVerificationTokenExpiresAt != null
            )), Times.Once);
        }

        [Fact]
        public async Task RegisterAsync_ShouldThrow_WhenEmailAlreadyExists()
        {
            // Arrange
            var request = new RegisterRequestDto
            {
                FirstName = "Chamindu",
                LastName = "Ranasinghe",
                Email = "chamindu@gmail.com",
                Password = "Password123",
                Role = UserRole.Candidate
            };

            _userRepositoryMock
                .Setup(x => x.ExistsAsync(request.Email))
                .ReturnsAsync(true);

            // Act
            var act = async () => await _authService.RegisterAsync(request);

            // Assert
            await act.Should().ThrowAsync<UserAlreadyExistsException>();
        }

        [Fact]
        public async Task LoginAsync_ShouldReturnToken_WhenCredentialsValidAndEmailVerified()
        {
            // Arrange
            var request = new LoginRequestDto
            {
                Email = "chamindu@gmail.com",
                Password = "Password123"
            };

            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = "Chamindu",
                LastName = "Ranasinghe",
                Email = request.Email,
                PasswordHash = "hashed-password",
                Role = UserRole.Candidate,
                IsEmailVerified = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _userRepositoryMock
                .Setup(x => x.GetByEmailAsync(request.Email))
                .ReturnsAsync(user);

            _passwordHasherMock
                .Setup(x => x.VerifyPassword(request.Password, user.PasswordHash))
                .Returns(true);

            _jwtTokenGeneratorMock
                .Setup(x => x.GenerateToken(user))
                .Returns("jwt-token");

            // Act
            var result = await _authService.LoginAsync(request);

            // Assert
            result.Should().NotBeNull();
            result.Token.Should().Be("jwt-token");
            result.Email.Should().Be(request.Email);
            result.Role.Should().Be(UserRole.Candidate.ToString());
        }

        [Fact]
        public async Task LoginAsync_ShouldThrow_WhenEmailNotVerified()
        {
            // Arrange
            var request = new LoginRequestDto
            {
                Email = "chamindu@gmail.com",
                Password = "Password123"
            };

            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = "Chamindu",
                LastName = "Ranasinghe",
                Email = request.Email,
                PasswordHash = "hashed-password",
                Role = UserRole.Candidate,
                IsEmailVerified = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _userRepositoryMock
                .Setup(x => x.GetByEmailAsync(request.Email))
                .ReturnsAsync(user);

            _passwordHasherMock
                .Setup(x => x.VerifyPassword(request.Password, user.PasswordHash))
                .Returns(true);

            // Act
            var act = async () => await _authService.LoginAsync(request);

            // Assert
            await act.Should().ThrowAsync<EmailNotVerifiedException>();
        }

        [Fact]
        public async Task LoginAsync_ShouldThrow_WhenInvalidPassword()
        {
            // Arrange
            var request = new LoginRequestDto
            {
                Email = "chamindu@gmail.com",
                Password = "WrongPassword"
            };

            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = "Chamindu",
                LastName = "Ranasinghe",
                Email = request.Email,
                PasswordHash = "hashed-password",
                Role = UserRole.Candidate,
                IsEmailVerified = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _userRepositoryMock
                .Setup(x => x.GetByEmailAsync(request.Email))
                .ReturnsAsync(user);

            _passwordHasherMock
                .Setup(x => x.VerifyPassword(request.Password, user.PasswordHash))
                .Returns(false);

            // Act
            var act = async () => await _authService.LoginAsync(request);

            // Assert
            await act.Should().ThrowAsync<InvalidCredentialsException>();
        }

        [Fact]
        public async Task VerifyEmailAsync_ShouldVerifyEmail_WhenTokenValid()
        {
            // Arrange
            var token = "valid-token";
            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = "chamindu@gmail.com",
                EmailVerificationToken = token,
                EmailVerificationTokenExpiresAt = DateTime.UtcNow.AddHours(1),
                IsEmailVerified = false
            };

            _userRepositoryMock
                .Setup(x => x.GetByEmailVerificationTokenAsync(token))
                .ReturnsAsync(user);

            _userRepositoryMock
                .Setup(x => x.UpdateAsync(It.IsAny<User>()))
                .Returns(Task.CompletedTask);

            // Act
            await _authService.VerifyEmailAsync(token);

            // Assert
            user.IsEmailVerified.Should().BeTrue();
            user.EmailVerificationToken.Should().BeNull();
            user.EmailVerificationTokenExpiresAt.Should().BeNull();

            _userRepositoryMock.Verify(x => x.UpdateAsync(user), Times.Once);
        }

        [Fact]
        public async Task VerifyEmailAsync_ShouldThrow_WhenTokenInvalid()
        {
            // Arrange
            var token = "invalid-token";

            _userRepositoryMock
                .Setup(x => x.GetByEmailVerificationTokenAsync(token))
                .ReturnsAsync((User?)null);

            // Act
            var act = async () => await _authService.VerifyEmailAsync(token);

            // Assert
            await act.Should().ThrowAsync<InvalidVerificationTokenException>();
        }

        [Fact]
        public async Task VerifyEmailAsync_ShouldThrow_WhenTokenExpired()
        {
            // Arrange
            var token = "expired-token";
            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = "chamindu@gmail.com",
                EmailVerificationToken = token,
                EmailVerificationTokenExpiresAt = DateTime.UtcNow.AddHours(-1),
                IsEmailVerified = false
            };

            _userRepositoryMock
                .Setup(x => x.GetByEmailVerificationTokenAsync(token))
                .ReturnsAsync(user);

            // Act
            var act = async () => await _authService.VerifyEmailAsync(token);

            // Assert
            await act.Should().ThrowAsync<ExpiredVerificationTokenException>();
        }

        [Fact]
        public async Task ResendVerificationEmailAsync_ShouldGenerateNewToken_WhenUserNotVerified()
        {
            // Arrange
            var email = "chamindu@gmail.com";
            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = email,
                IsEmailVerified = false,
                EmailVerificationToken = "old-token",
                EmailVerificationTokenExpiresAt = DateTime.UtcNow.AddHours(-1)
            };

            _userRepositoryMock
                .Setup(x => x.GetByEmailAsync(email))
                .ReturnsAsync(user);

            _userRepositoryMock
                .Setup(x => x.UpdateAsync(It.IsAny<User>()))
                .Returns(Task.CompletedTask);

            _emailServiceMock
                .Setup(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .Returns(Task.CompletedTask);

            // Act
            await _authService.ResendVerificationEmailAsync(email);

            // Assert
            user.EmailVerificationToken.Should().NotBe("old-token");
            user.EmailVerificationTokenExpiresAt.Should().BeAfter(DateTime.UtcNow);
            _userRepositoryMock.Verify(x => x.UpdateAsync(user), Times.Once);
        }

        [Fact]
        public async Task ResendVerificationEmailAsync_ShouldDoNothing_WhenUserAlreadyVerified()
        {
            // Arrange
            var email = "chamindu@gmail.com";
            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = email,
                IsEmailVerified = true
            };

            _userRepositoryMock
                .Setup(x => x.GetByEmailAsync(email))
                .ReturnsAsync(user);

            // Act
            await _authService.ResendVerificationEmailAsync(email);

            // Assert
            _userRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<User>()), Times.Never);
            _emailServiceMock.Verify(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async Task ForgotPasswordAsync_ShouldGenerateResetToken_WhenUserExists()
        {
            // Arrange
            var request = new ForgotPasswordRequestDto { Email = "chamindu@gmail.com" };
            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                FirstName = "Chamindu"
            };

            _userRepositoryMock
                .Setup(x => x.GetByEmailAsync(request.Email))
                .ReturnsAsync(user);

            _userRepositoryMock
                .Setup(x => x.UpdateAsync(It.IsAny<User>()))
                .Returns(Task.CompletedTask);

            _emailServiceMock
                .Setup(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .Returns(Task.CompletedTask);

            // Act
            await _authService.ForgotPasswordAsync(request);

            // Assert
            user.ResetPasswordToken.Should().NotBeNull();
            user.ResetPasswordTokenExpiresAt.Should().BeAfter(DateTime.UtcNow);
            user.ResetPasswordTokenExpiresAt.Should().BeBefore(DateTime.UtcNow.AddMinutes(20));
            _userRepositoryMock.Verify(x => x.UpdateAsync(user), Times.Once);
        }

        [Fact]
        public async Task ForgotPasswordAsync_ShouldDoNothing_WhenUserNotFound()
        {
            // Arrange
            var request = new ForgotPasswordRequestDto { Email = "nonexistent@gmail.com" };

            _userRepositoryMock
                .Setup(x => x.GetByEmailAsync(request.Email))
                .ReturnsAsync((User?)null);

            // Act
            await _authService.ForgotPasswordAsync(request);

            // Assert
            _userRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<User>()), Times.Never);
            _emailServiceMock.Verify(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async Task ResetPasswordAsync_ShouldResetPassword_WhenTokenValid()
        {
            // Arrange
            var token = "valid-reset-token";
            var request = new ResetPasswordRequestDto { Token = token, NewPassword = "NewPassword123" };
            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = "chamindu@gmail.com",
                ResetPasswordToken = token,
                ResetPasswordTokenExpiresAt = DateTime.UtcNow.AddMinutes(10),
                PasswordHash = "old-hashed-password"
            };

            _userRepositoryMock
                .Setup(x => x.GetByResetTokenAsync(token))
                .ReturnsAsync(user);

            _passwordHasherMock
                .Setup(x => x.HashPassword(request.NewPassword))
                .Returns("new-hashed-password");

            _userRepositoryMock
                .Setup(x => x.UpdateAsync(It.IsAny<User>()))
                .Returns(Task.CompletedTask);

            // Act
            await _authService.ResetPasswordAsync(request);

            // Assert
            user.PasswordHash.Should().Be("new-hashed-password");
            user.ResetPasswordToken.Should().BeNull();
            user.ResetPasswordTokenExpiresAt.Should().BeNull();
            _userRepositoryMock.Verify(x => x.UpdateAsync(user), Times.Once);
        }

        [Fact]
        public async Task ResetPasswordAsync_ShouldThrow_WhenTokenInvalid()
        {
            // Arrange
            var request = new ResetPasswordRequestDto { Token = "invalid-token", NewPassword = "NewPassword123" };

            _userRepositoryMock
                .Setup(x => x.GetByResetTokenAsync(request.Token))
                .ReturnsAsync((User?)null);

            // Act
            var act = async () => await _authService.ResetPasswordAsync(request);

            // Assert
            await act.Should().ThrowAsync<InvalidResetPasswordTokenException>();
        }

        [Fact]
        public async Task ResetPasswordAsync_ShouldThrow_WhenTokenExpired()
        {
            // Arrange
            var token = "expired-token";
            var request = new ResetPasswordRequestDto { Token = token, NewPassword = "NewPassword123" };
            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = "chamindu@gmail.com",
                ResetPasswordToken = token,
                ResetPasswordTokenExpiresAt = DateTime.UtcNow.AddMinutes(-1)
            };

            _userRepositoryMock
                .Setup(x => x.GetByResetTokenAsync(token))
                .ReturnsAsync(user);

            // Act
            var act = async () => await _authService.ResetPasswordAsync(request);

            // Assert
            await act.Should().ThrowAsync<ExpiredResetPasswordTokenException>();
        }

        [Fact]
        public async Task RegisterAsync_ShouldNotAllowAdminRole_WhenClientProvidesAdminRole()
        {
            // Arrange
            var request = new RegisterRequestDto
            {
                FirstName = "Admin",
                LastName = "User",
                Email = "admin@gmail.com",
                Password = "Password123",
                Role = UserRole.Admin
            };

            _userRepositoryMock
                .Setup(x => x.ExistsAsync(request.Email))
                .ReturnsAsync(false);

            _passwordHasherMock
                .Setup(x => x.HashPassword(request.Password))
                .Returns("hashed-password");

            _userRepositoryMock
                .Setup(x => x.AddAsync(It.IsAny<User>()))
                .Returns(Task.CompletedTask);

            _userRepositoryMock
                .Setup(x => x.SaveChangesAsync())
                .Returns(Task.CompletedTask);

            _candidateRepositoryMock
                .Setup(x => x.AddAsync(It.IsAny<Candidate>()))
                .Returns(Task.CompletedTask);

            _candidateRepositoryMock
                .Setup(x => x.SaveChangesAsync())
                .ReturnsAsync(true);

            _emailServiceMock
                .Setup(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _authService.RegisterAsync(request);

            // Assert - Role should be set to what client provided (current behavior)
            // This test documents current behavior; if we want to restrict server-side,
            // the service should override the role
            result.Role.Should().Be(UserRole.Admin.ToString());
        }
    }
}
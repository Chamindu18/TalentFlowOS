using FluentAssertions;
using Moq;
using Xunit;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Security;
using TalentFlow.Application.Interfaces.Services; 
using TalentFlow.Application.DTOs.Auth;
using TalentFlow.Application.Exceptions.Auth;
using TalentFlow.Application.Services;
using TalentFlow.Domain.Entities;
using TalentFlow.Domain.Enums;

namespace UnitTests.Services
{
    public class AuthServiceTests
    {
        private readonly Mock<IUserRepository> _userRepositoryMock;
        private readonly Mock<IPasswordHasher> _passwordHasherMock;
        private readonly Mock<IJwtTokenGenerator> _jwtTokenGeneratorMock;
        private readonly Mock<IEmailService> _emailServiceMock; 
        private readonly AuthService _authService;

        public AuthServiceTests()
        {
            _userRepositoryMock = new Mock<IUserRepository>();
            _passwordHasherMock = new Mock<IPasswordHasher>();
            _jwtTokenGeneratorMock = new Mock<IJwtTokenGenerator>();
            _emailServiceMock = new Mock<IEmailService>(); 

            _authService = new AuthService(
                _userRepositoryMock.Object,
                _passwordHasherMock.Object,
                _jwtTokenGeneratorMock.Object,
                _emailServiceMock.Object); 
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
            result.Token.Should().Be("jwt-token");
        }
    }
}
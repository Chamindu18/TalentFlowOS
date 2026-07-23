using TalentFlow.Application.DTOs.Admin;
using TalentFlow.Application.DTOs.Users;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.Application.Services;

public class AdminService : IAdminService
{
    private readonly IUserRepository _userRepository;

    public AdminService(
        IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<DashboardStatsDto> GetDashboardStatsAsync()
    {
        var users = await _userRepository.GetAllAsync();

        return new DashboardStatsDto
        {
            TotalUsers = users.Count(),
            TotalCandidates = 0,
            TotalCompanies = 0,
            TotalJobs = 0,
            TotalInterviews = 0
        };
    }

    public async Task<IEnumerable<UserResponseDto>>
        GetAllUsersAsync()
    {
        var users =
            await _userRepository.GetAllAsync();

        return users.Select(user =>
            new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role.ToString(),
                IsEmailVerified =
                    user.IsEmailVerified
            });
    }

    public async Task<bool> UpdateUserRoleAsync(
    Guid userId,
    string role)
    {
        var user =
            await _userRepository.GetByIdAsync(userId);

        if (user == null)
        {
            return false;
        }

        if (
            Enum.TryParse(
                role,
                out TalentFlow.Domain.Enums.UserRole userRole
            )
        )
        {
            user.Role = userRole;

            await _userRepository.UpdateAsync(user);

            return true;
        }

        return false;
    }
}
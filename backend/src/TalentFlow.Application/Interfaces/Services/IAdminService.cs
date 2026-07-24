using TalentFlow.Application.DTOs.Admin;
using TalentFlow.Application.DTOs.Users;

namespace TalentFlow.Application.Interfaces.Services;

public interface IAdminService
{
    Task<DashboardStatsDto> GetDashboardStatsAsync();

    Task<IEnumerable<UserResponseDto>> GetAllUsersAsync();

    Task<bool> UpdateUserRoleAsync(
        Guid userId,
        string role);

    Task<bool> DisableUserAsync(Guid userId);
}
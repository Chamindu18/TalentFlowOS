using TalentFlow.Application.DTOs.Admin;
using TalentFlow.Application.DTOs.Users;

namespace TalentFlow.Application.Interfaces.Services;

public interface IAdminService
{
    Task<DashboardStatsDto> GetDashboardStatsAsync();

    Task<IEnumerable<UserResponseDto>>
        GetAllUsersAsync();
}
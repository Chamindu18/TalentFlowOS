using TalentFlow.Application.DTOs.Admin;
using TalentFlow.Application.DTOs.Users;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.Application.Services;

public class AdminService : IAdminService
{
    public async Task<DashboardStatsDto> GetDashboardStatsAsync()
    {
        return await Task.FromResult(
            new DashboardStatsDto
            {
                TotalUsers = 0,
                TotalCandidates = 0,
                TotalCompanies = 0,
                TotalJobs = 0,
                TotalInterviews = 0
            }
        );
    }

    public async Task<IEnumerable<UserResponseDto>> GetAllUsersAsync()
    {
        return await Task.FromResult(
            new List<UserResponseDto>()
        );
    }
}
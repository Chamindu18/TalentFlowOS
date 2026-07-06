using TalentFlow.Application.DTOs.Admin;

namespace TalentFlow.Application.Interfaces.Services;

public interface IAdminService
{
    Task<DashboardStatsDto> GetDashboardStatsAsync();
}
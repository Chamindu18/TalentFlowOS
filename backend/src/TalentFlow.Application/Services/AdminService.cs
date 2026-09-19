using TalentFlow.Application.DTOs.Admin;
using TalentFlow.Application.DTOs.Users;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Domain.Enums;

namespace TalentFlow.Application.Services;

public class AdminService : IAdminService
{
    private readonly IUserRepository _userRepository;
    private readonly ICompanyRepository _companyRepository;
    private readonly IJobRepository _jobRepository;
    private readonly IInterviewRepository _interviewRepository;

    public AdminService(
        IUserRepository userRepository,
        ICompanyRepository companyRepository,
        IJobRepository jobRepository,
        IInterviewRepository interviewRepository)
    {
        _userRepository = userRepository;
        _companyRepository = companyRepository;
        _jobRepository = jobRepository;
        _interviewRepository = interviewRepository;
    }

    public async Task<DashboardStatsDto> GetDashboardStatsAsync()
    {
        var users = await _userRepository.GetAllAsync();
        var companies = await _companyRepository.GetAllAsync();
        var jobs = await _jobRepository.GetActiveJobsAsync();
        var interviewsCount = await _interviewRepository.GetCountAsync();

        return new DashboardStatsDto
        {
            TotalUsers = users.Count(),
            TotalCandidates = users.Count(u => u.Role == UserRole.Candidate),
            TotalCompanies = companies.Count(),
            TotalJobs = jobs.Count(),
            TotalInterviews = interviewsCount
        };
    }

    public async Task<IEnumerable<UserResponseDto>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllAsync();

        return users.Select(user => new UserResponseDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = user.Role.ToString(),
            IsEmailVerified = user.IsEmailVerified
        });
    }

    public async Task<bool> UpdateUserRoleAsync(Guid userId, string role)
    {
        var user = await _userRepository.GetByIdAsync(userId);

        if (user == null)
        {
            return false;
        }

        if (Enum.TryParse(role, out TalentFlow.Domain.Enums.UserRole userRole))
        {
            user.Role = userRole;

            await _userRepository.UpdateAsync(user);

            return true;
        }

        return false;
    }

    public async Task<bool> DisableUserAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);

        if (user == null)
        {
            return false;
        }

        user.IsEmailVerified = false;

        await _userRepository.UpdateAsync(user);

        return true;
    }
}
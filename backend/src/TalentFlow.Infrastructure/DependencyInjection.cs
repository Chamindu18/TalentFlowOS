using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TalentFlow.Application.Common.Settings;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Security;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Application.Services;
using TalentFlow.Infrastructure.Persistence.Contexts;
using TalentFlow.Infrastructure.Repositories;
using TalentFlow.Infrastructure.Repositories.Identity;
using TalentFlow.Infrastructure.Security;

namespace TalentFlow.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection")));

        services.Configure<JwtSettings>(
            configuration.GetSection(JwtSettings.SectionName));

        // ==========================
        // Repositories
        // ==========================

        services.AddScoped<IUserRepository, UserRepository>();

        // Candidate Module
        services.AddScoped<ICandidateRepository, CandidateRepository>();
        services.AddScoped<IEducationRepository, EducationRepository>();
        services.AddScoped<IExperienceRepository, ExperienceRepository>();
        services.AddScoped<ISkillRepository, SkillRepository>();
        services.AddScoped<ICertificateRepository, CertificateRepository>();

        // Job Module
        services.AddScoped<IJobRepository, JobRepository>();

        // Job Application Module
        services.AddScoped<IApplicationRepository, ApplicationRepository>();

        // ==========================
        // Security
        // ==========================

        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        // ==========================
        // Services
        // ==========================

        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IApplicationService, JobApplicationService>();

        return services;
    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TalentFlow.Application.Common.Settings;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Security;
using TalentFlow.Infrastructure.Persistence.Contexts;
using TalentFlow.Infrastructure.Repositories.Identity;
using TalentFlow.Infrastructure.Repositories; // මේක අනිවාර්යයෙන්ම දාන්න
using TalentFlow.Infrastructure.Security;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Application.Services;

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

        services.AddScoped<IUserRepository, UserRepository>();

        // --- Candidate Module Repositories ---
        services.AddScoped<ICandidateRepository, CandidateRepository>();
        services.AddScoped<IExperienceRepository, ExperienceRepository>();
        services.AddScoped<ISkillRepository, SkillRepository>();
        services.AddScoped<ICertificateRepository, CertificateRepository>();
        services.AddScoped<IEducationRepository, EducationRepository>();

        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IEducationRepository, EducationRepository>();

        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        services.AddScoped<IAuthService, AuthService>();

        return services;
    }
}
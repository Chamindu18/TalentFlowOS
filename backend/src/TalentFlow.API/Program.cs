using System.Text.Json.Serialization;

using Microsoft.EntityFrameworkCore;

using TalentFlow.Application.Common.Settings;
using TalentFlow.Application.Interfaces.Persistence;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Security;
using TalentFlow.Application.Interfaces.Services;

using TalentFlow.Application.Mappings;
using TalentFlow.Application.Services;

using TalentFlow.Infrastructure.Persistence.Contexts;

using TalentFlow.Infrastructure.Repositories;
using TalentFlow.Infrastructure.Repositories.Identity;

using TalentFlow.Infrastructure.Security;

var builder = WebApplication.CreateBuilder(args);

// =====================================
// Controllers
// =====================================

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });

// =====================================
// CORS (Development Only)
// =====================================

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "Frontend",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// =====================================
// Swagger
// =====================================

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// =====================================
// AutoMapper
// =====================================

builder.Services.AddAutoMapper(
    typeof(Program).Assembly,
    typeof(JobProfile).Assembly
);

// =====================================
// JWT Settings
// =====================================

builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection(
        JwtSettings.SectionName
    )
);

// =====================================
// Database
// =====================================

builder.Services.AddDbContext<ApplicationDbContext>(
    options =>
    {
        options.UseNpgsql(
            builder.Configuration.GetConnectionString(
                "DefaultConnection"
            )
        );
    }
);

// =====================================
// Application Services
// =====================================

builder.Services.AddScoped<
    IAuthService,
    AuthService
>();

builder.Services.AddScoped<
    IJobService,
    JobService
>();

builder.Services.AddScoped<
    IApplicationService,
    JobApplicationService
>();

builder.Services.AddScoped<
    ICompanyService,
    CompanyService
>();

builder.Services.AddScoped<
    IDepartmentService,
    DepartmentService
>();

// =====================================
// Repositories
// =====================================

builder.Services.AddScoped<
    IUserRepository,
    UserRepository
>();

builder.Services.AddScoped<
    IJobRepository,
    JobRepository
>();

builder.Services.AddScoped<
    IApplicationRepository,
    JobApplicationRepository
>();

builder.Services.AddScoped<
    ICompanyRepository,
    CompanyRepository
>();

builder.Services.AddScoped<
    IDepartmentRepository,
    DepartmentRepository
>();

// =====================================
// Security
// =====================================

builder.Services.AddScoped<
    IPasswordHasher,
    PasswordHasher
>();

builder.Services.AddScoped<
    IJwtTokenGenerator,
    JwtTokenGenerator
>();

var app = builder.Build();

// =====================================
// Development
// =====================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// =====================================
// Middleware
// =====================================

// TEMPORARILY DISABLED FOR LOCAL DEV
// app.UseHttpsRedirection();

app.UseCors("Frontend");

app.MapControllers();

app.Run();
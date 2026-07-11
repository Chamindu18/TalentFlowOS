using System.Text;
using System.Text.Json.Serialization;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TalentFlow.API.Middleware;

using TalentFlow.Application.Common.Settings;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Security;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Application.Mappings;
using TalentFlow.Application.Services;

using TalentFlow.Infrastructure.Persistence.Contexts;
using TalentFlow.Infrastructure.Repositories;
using TalentFlow.Infrastructure.Repositories.Identity;
using TalentFlow.Infrastructure.Security;
using TalentFlow.Infrastructure.Services;

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
// CORS
// =====================================

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "Frontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
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

var jwtSettings =
    builder.Configuration
        .GetSection(JwtSettings.SectionName)
        .Get<JwtSettings>()!;

builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection(
        JwtSettings.SectionName
    )
);

// =====================================
// JWT Authentication
// =====================================

builder.Services
    .AddAuthentication(
        JwtBearerDefaults.AuthenticationScheme
    )
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer =
                    jwtSettings.Issuer,

                ValidAudience =
                    jwtSettings.Audience,

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(
                            jwtSettings.Secret
                        )
                    )
            };
    });

builder.Services.AddAuthorization();

// =====================================
// Email Settings
// =====================================

builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection(
        EmailSettings.SectionName
    )
);

// =====================================
// Frontend Settings
// =====================================

builder.Services.Configure<FrontendSettings>(
    builder.Configuration.GetSection(
        FrontendSettings.SectionName
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

builder.Services.AddScoped<
    IEmailService,
    EmailService
>();
builder.Services.AddScoped<
    IAdminService,
    AdminService
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

app.UseHttpsRedirection();


// =====================================
// Middleware
// =====================================

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("Frontend");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
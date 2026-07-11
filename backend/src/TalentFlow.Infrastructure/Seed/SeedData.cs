using Microsoft.EntityFrameworkCore;
using TalentFlow.Domain.Entities;
using TalentFlow.Domain.Enums;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.Infrastructure.Seed;

public static class SeedData
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Check if data already exists
        if (await context.Companies.AnyAsync())
        {
            return;
        }

        // Create default company
        var companyId = Guid.NewGuid();
        var company = new Company
        {
            Id = companyId,
            Name = "Tech Corp",
            Description = "Default company for recruitment",
            Industry = "Technology",
            City = "Colombo",
            Country = "Sri Lanka",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            IsDeleted = false
        };

        await context.Companies.AddAsync(company);

        // Create default department
        var department = new Department
        {
            Id = Guid.NewGuid(),
            CompanyId = companyId,
            Name = "Engineering",
            Description = "Software Engineering Department",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            IsDeleted = false
        };

        await context.Departments.AddAsync(department);

        await context.SaveChangesAsync();
    }
}
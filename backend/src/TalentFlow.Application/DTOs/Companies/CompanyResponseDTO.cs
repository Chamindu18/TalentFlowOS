using System;
using System.Collections.Generic;
using System.Text;

namespace TalentFlow.Application.DTOs.Companies;

public class CompanyResponseDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string? Industry { get; set; }
    public string? WebsiteUrl { get; set; }
    public string? LogoUrl { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public int? EmployeeCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

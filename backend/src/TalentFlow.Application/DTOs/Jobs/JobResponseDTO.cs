using System;
using System.Collections.Generic;
using System.Text;

namespace TalentFlow.Application.DTOs.Jobs;

public class JobResponseDTO
{
    public Guid Id { get; set; }
    public Guid CompanyId { get; set; }
    public Guid DepartmentId { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string? Responsibilities { get; set; }
    public string? Requirements { get; set; }
    public string? EmploymentType { get; set; }
    public string? ExperienceLevel { get; set; }
    public decimal? SalaryMin { get; set; }
    public decimal? SalaryMax { get; set; }
    public string? Location { get; set; }
    public bool IsRemote { get; set; }
    public DateTime? ApplicationDeadline { get; set; }
    public bool IsActive { get; set; }
    public string? Status { get; set; }
    public string CompanyName { get; set; } = null!;
    public string DepartmentName { get; set; } = null!;
    public int ApplicationCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
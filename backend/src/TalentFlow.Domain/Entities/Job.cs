using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace TalentFlow.Domain.Entities;

public class Job
{
    public Guid Id { get; set; }

    public Guid CompanyId { get; set; }

    public Guid DepartmentId { get; set; }

    [Required]
    [MaxLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string? Responsibilities { get; set; }

    public string? Requirements { get; set; }

    [MaxLength(50)]
    public string? EmploymentType { get; set; }

    [MaxLength(50)]
    public string? ExperienceLevel { get; set; }

    public decimal? SalaryMin { get; set; }

    public decimal? SalaryMax { get; set; }

    [MaxLength(150)]
    public string? Location { get; set; }

    public bool IsRemote { get; set; }

    public DateTime? ApplicationDeadline { get; set; }

    public bool IsActive { get; set; }

    [MaxLength(50)]
    public string? Status { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    // Navigation Properties
    public Company Company { get; set; } = null!;
    public Department Department { get; set; } = null!;
    public ICollection<Application> Applications { get; set; } = new List<Application>();
}
using System;
using System.Collections.Generic;
using System.Text;

using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Application.DTOs.Jobs;

public class CreateJobRequestDTO
{
    [Required]
    public Guid CompanyId { get; set; }

    [Required]
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
}

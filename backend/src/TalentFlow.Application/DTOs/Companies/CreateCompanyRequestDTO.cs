using System;
using System.Collections.Generic;
using System.Text;

using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Application.DTOs.Companies;

public class CreateCompanyRequestDTO
{
    [Required]
    [MaxLength(255)]
    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    [MaxLength(100)]
    public string? Industry { get; set; }

    [MaxLength(500)]
    public string? WebsiteUrl { get; set; }

    [MaxLength(255)]
    public string? Address { get; set; }

    [MaxLength(100)]
    public string? City { get; set; }

    [MaxLength(100)]
    public string? Country { get; set; }

    public int? EmployeeCount { get; set; }
}

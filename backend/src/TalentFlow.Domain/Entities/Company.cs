using System;
using System.Collections.Generic;
using System.Text;

using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Domain.Entities;

public class Company
{
    public Guid Id { get; set; }

    [Required]
    [MaxLength(255)]
    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    [MaxLength(100)]
    public string? Industry { get; set; }

    [MaxLength(500)]
    public string? WebsiteUrl { get; set; }

    public string? LogoUrl { get; set; }

    [MaxLength(255)]
    public string? Address { get; set; }

    [MaxLength(100)]
    public string? City { get; set; }

    [MaxLength(100)]
    public string? Country { get; set; }

    public int? EmployeeCount { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    // Navigation Properties
    public ICollection<Department> Departments { get; set; } = new List<Department>();
    public ICollection<Job> Jobs { get; set; } = new List<Job>();
}

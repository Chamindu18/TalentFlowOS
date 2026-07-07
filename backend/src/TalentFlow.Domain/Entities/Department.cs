using System;
using System.Collections.Generic;
using System.Text;

using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Domain.Entities;

public class Department
{
    public Guid Id { get; set; }

    public Guid CompanyId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    [MaxLength(500)]
    public string? Description { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    // Navigation Properties
    public Company Company { get; set; } = null!;
    public ICollection<Job> Jobs { get; set; } = new List<Job>();
}
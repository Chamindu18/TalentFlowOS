using System;
using System.Collections.Generic;
using System.Text;

using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Application.DTOs.Departments;

public class CreateDepartmentRequestDTO
{
    [Required]
    public Guid CompanyId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    [MaxLength(500)]
    public string? Description { get; set; }
}

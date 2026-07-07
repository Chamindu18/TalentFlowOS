using System;
using System.Collections.Generic;
using System.Text;

namespace TalentFlow.Application.DTOs.Departments;

public class DepartmentResponseDTO
{
    public Guid Id { get; set; }
    public Guid CompanyId { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string CompanyName { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

using System;
using System.Collections.Generic;
using System.Text;

using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Application.DTOs.Applications;

public class UpdateApplicationStatusRequestDTO
{
    [Required]
    [MaxLength(50)]
    public string Status { get; set; } = null!;
}

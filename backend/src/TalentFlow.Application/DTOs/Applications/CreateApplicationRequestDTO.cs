using System;
using System.Collections.Generic;
using System.Text;

using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Application.DTOs.Applications;

public class CreateApplicationRequestDTO
{
    [Required]
    public Guid JobId { get; set; }

    public string? CoverLetter { get; set; }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;
using TalentFlow.Application.DTOs.Applications;
using TalentFlow.Domain.Enums;

namespace TalentFlow.Application.Validators.Applications;

public class UpdateApplicationStatusRequestValidator : AbstractValidator<UpdateApplicationStatusRequestDTO>
{
    public UpdateApplicationStatusRequestValidator()
    {
        RuleFor(x => x.Status)
            .NotEmpty().WithMessage("Status is required")
            .Must(BeValidStatus).WithMessage($"Status must be one of: {string.Join(", ", Enum.GetNames(typeof(ApplicationStatus)))}");
    }

    private bool BeValidStatus(string status)
    {
        return Enum.TryParse<ApplicationStatus>(status, true, out _);
    }
}

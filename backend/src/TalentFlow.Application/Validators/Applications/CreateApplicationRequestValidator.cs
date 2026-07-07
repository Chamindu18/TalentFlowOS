using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;
using TalentFlow.Application.DTOs.Applications;

namespace TalentFlow.Application.Validators.Applications;

public class CreateApplicationRequestValidator : AbstractValidator<CreateApplicationRequestDTO>
{
    public CreateApplicationRequestValidator()
    {
        RuleFor(x => x.JobId)
            .NotEmpty().WithMessage("Job ID is required");
    }
}

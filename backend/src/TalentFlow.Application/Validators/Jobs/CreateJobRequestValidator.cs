using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;
using TalentFlow.Application.DTOs.Jobs;

namespace TalentFlow.Application.Validators.Jobs;

public class CreateJobRequestValidator : AbstractValidator<CreateJobRequestDTO>
{
    public CreateJobRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Job title is required")
            .MaximumLength(255).WithMessage("Job title must not exceed 255 characters");

        RuleFor(x => x.SalaryMin)
            .GreaterThanOrEqualTo(0).When(x => x.SalaryMin.HasValue)
            .WithMessage("Minimum salary must be greater than or equal to 0");

        RuleFor(x => x.SalaryMax)
            .GreaterThanOrEqualTo(0).When(x => x.SalaryMax.HasValue)
            .WithMessage("Maximum salary must be greater than or equal to 0");

        RuleFor(x => x)
            .Must(x => !x.SalaryMin.HasValue || !x.SalaryMax.HasValue || x.SalaryMin <= x.SalaryMax)
            .WithMessage("Minimum salary must be less than or equal to maximum salary");

        RuleFor(x => x.ApplicationDeadline)
            .GreaterThan(DateTime.UtcNow).When(x => x.ApplicationDeadline.HasValue)
            .WithMessage("Application deadline must be in the future");
    }
}
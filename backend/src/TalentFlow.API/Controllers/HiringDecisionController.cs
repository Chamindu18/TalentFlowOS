using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Route("api/hiring-decisions")]
    [Authorize(Roles = "HiringManager")]
    public class HiringDecisionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HiringDecisionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("make")]
        [HttpPost]
        public async Task<IActionResult> MakeDecision([FromBody] HiringDecisionRequest request)
        {
            if (request == null)
            {
                return BadRequest("Decision data cannot be null.");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
            if (user == null || user.CompanyId == null)
                return Forbid("User not associated with a company.");

            string applicationStatus;
            switch (request.Decision?.Trim())
            {
                case "Hired":
                    applicationStatus = "Offer";
                    break;
                case "Rejected":
                    applicationStatus = "Rejected";
                    break;
                default:
                    return BadRequest($"Invalid decision value: '{request.Decision}'. Allowed values: 'Hired', 'Rejected'.");
            }

            var application = await _context.JobApplications
                .Include(a => a.Job)
                .FirstOrDefaultAsync(a => a.Id == request.ApplicationId);
            if (application == null)
            {
                return NotFound($"Application with ID {request.ApplicationId} not found.");
            }

            if (application.Job == null || application.Job.CompanyId != user.CompanyId.Value)
            {
                return Forbid("You are not authorized to make decisions for this application.");
            }

            var existingDecision = await _context.HiringDecisions
                .FirstOrDefaultAsync(hd => hd.ApplicationId == request.ApplicationId);
            if (existingDecision != null)
            {
                return BadRequest($"A hiring decision already exists for application {request.ApplicationId}.");
            }

            if (application.Status == "Offer" || application.Status == "Rejected")
            {
                return BadRequest($"Cannot make a decision for an application that is already {application.Status}.");
            }

            var decision = new HiringDecision
            {
                Id = Guid.NewGuid(),
                ApplicationId = request.ApplicationId,
                ManagerId = user.Id,
                Decision = request.Decision,
                Justification = request.Justification,
                DecidedAt = DateTime.UtcNow
            };

            _context.HiringDecisions.Add(decision);

            application.Status = applicationStatus;
            application.UpdatedAt = DateTime.UtcNow;
            _context.JobApplications.Update(application);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Final hiring decision recorded successfully.", decisionId = decision.Id });
        }

        [HttpGet("application/{applicationId}")]
        public async Task<IActionResult> GetDecisionByApplication(Guid applicationId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
            if (user == null || user.CompanyId == null)
                return Forbid("User not associated with a company.");

            var application = await _context.JobApplications
                .Include(a => a.Job)
                .FirstOrDefaultAsync(a => a.Id == applicationId);
            if (application == null || application.Job == null || application.Job.CompanyId != user.CompanyId.Value)
            {
                return Forbid("You are not authorized to view this decision.");
            }

            var decision = await _context.HiringDecisions
                .FirstOrDefaultAsync(hd => hd.ApplicationId == applicationId);

            if (decision == null)
            {
                return NotFound($"No hiring decision found for application ID {applicationId}.");
            }

            return Ok(decision);
        }
    }

    public class HiringDecisionRequest
    {
        public Guid ApplicationId { get; set; }
        public string Decision { get; set; } = string.Empty;
        public string? Justification { get; set; }
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Route("api/hiring-decisions")]
    [Authorize(Roles = "HiringManager")] // Securely consumes the team authentication structure
    public class HiringDecisionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HiringDecisionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. POST: api/hiringdecision/make (legacy) and api/hiring-decisions (frontend expected)
        [HttpPost("make")]
        [HttpPost]
        public async Task<IActionResult> MakeDecision([FromBody] HiringDecision decision)
        {
            if (decision == null)
            {
                return BadRequest("Decision data cannot be null.");
            }

            // Validate decision value - map frontend values to ApplicationStatus enum
            string applicationStatus;
            switch (decision.Decision?.Trim())
            {
                case "Hired":
                    applicationStatus = "Offer";
                    break;
                case "Rejected":
                    applicationStatus = "Rejected";
                    break;
                default:
                    return BadRequest($"Invalid decision value: '{decision.Decision}'. Allowed values: 'Hired', 'Rejected'.");
            }

            // Check if application exists
            var application = await _context.JobApplications.FirstOrDefaultAsync(a => a.Id == decision.ApplicationId);
            if (application == null)
            {
                return NotFound($"Application with ID {decision.ApplicationId} not found.");
            }

            // Prevent duplicate decisions for the same application
            var existingDecision = await _context.HiringDecisions
                .FirstOrDefaultAsync(hd => hd.ApplicationId == decision.ApplicationId);
            if (existingDecision != null)
            {
                return BadRequest($"A hiring decision already exists for application {decision.ApplicationId}.");
            }

            // Prevent decision on terminal states (Offer/Rejected)
            if (application.Status == "Offer" || application.Status == "Rejected")
            {
                return BadRequest($"Cannot make a decision for an application that is already {application.Status}.");
            }

            decision.Id = Guid.NewGuid();
            _context.HiringDecisions.Add(decision);

            // Update application status
            application.Status = applicationStatus;
            application.UpdatedAt = DateTime.UtcNow;
            _context.JobApplications.Update(application);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Final hiring decision recorded successfully.", decisionId = decision.Id });
        }

        // 2. GET: api/hiringdecision/application/{applicationId}
        [HttpGet("application/{applicationId}")]
        public async Task<IActionResult> GetDecisionByApplication(Guid applicationId)
        {
            var decision = await _context.HiringDecisions
                .FirstOrDefaultAsync(hd => hd.ApplicationId == applicationId);

            if (decision == null)
            {
                return NotFound($"No hiring decision found for application ID {applicationId}.");
            }

            return Ok(decision);
        }
    }
}
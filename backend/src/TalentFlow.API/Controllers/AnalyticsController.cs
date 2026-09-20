using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "HiringManager")]
    public class AnalyticsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AnalyticsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. GET: api/analytics/summary
        [HttpGet("summary")]
        public async Task<IActionResult> GetHiringSummary()
        {
            // Get the authenticated user's company ID
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
            if (user == null || user.CompanyId == null)
                return Forbid("User not associated with a company.");

            var companyId = user.CompanyId.Value;

            // Count interviews for this company
            var totalInterviews = await _context.Interviews
                .Include(i => i.Application)
                    .ThenInclude(a => a.Job)
                .Where(i => !i.IsDeleted 
                    && i.Application != null 
                    && i.Application.Job != null 
                    && i.Application.Job.CompanyId == companyId)
                .CountAsync();

            // Get application IDs for this company
            var companyApplicationIds = await _context.JobApplications
                .Where(a => a.Job != null && a.Job.CompanyId == companyId)
                .Select(a => a.Id)
                .ToListAsync();

            // Count evaluations for this company
            var totalEvaluations = await _context.Evaluations
                .Where(e => companyApplicationIds.Contains(e.ApplicationId))
                .CountAsync();

            // Count hiring decisions for this company
            var decisions = await _context.HiringDecisions
                .Where(h => companyApplicationIds.Contains(h.ApplicationId))
                .ToListAsync();

            var offersAccepted = decisions.Count(d => d.Decision.Equals("Accepted", StringComparison.OrdinalIgnoreCase));
            var offersRejected = decisions.Count(d => d.Decision.Equals("Rejected", StringComparison.OrdinalIgnoreCase));

            var summary = new
            {
                TotalInterviewsScheduled = totalInterviews,
                TotalEvaluationsCompleted = totalEvaluations,
                TotalDecisionsMade = decisions.Count,
                AcceptedCount = offersAccepted,
                RejectedCount = offersRejected,
                ConversionRate = decisions.Count > 0 ? (double)offersAccepted / decisions.Count * 100 : 0.0
            };

            return Ok(summary);
        }
    }
}
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
    [Authorize(Roles = "HiringManager")] // Securely locked down to Member 4's target role
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
            var totalInterviews = await _context.Interviews.CountAsync();
            var totalEvaluations = await _context.Evaluations.CountAsync();
            
            var decisions = await _context.HiringDecisions.ToListAsync();
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
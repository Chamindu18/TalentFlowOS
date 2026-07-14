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
    [Route("api/analytics")] // 🎯 Explicit lowercase routing to prevent case-sensitivity mismatches
    [Authorize(Roles = "HiringManager")] 
    public class AnalyticsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AnalyticsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/analytics/summary
        [HttpGet("summary")]
        public async Task<IActionResult> GetHiringSummary()
        {
            // 🚀 Database-level scalar aggregation (Zero row-loading RAM overhead)
            var totalInterviews = await _context.Interviews.CountAsync();
            var totalEvaluations = await _context.Evaluations.CountAsync();
            var totalDecisions = await _context.HiringDecisions.CountAsync();
            
            // EF Core translates these directly into targeted SQL COUNT queries
            var offersAccepted = await _context.HiringDecisions
                .CountAsync(d => d.Decision == "Accepted");
                
            var offersRejected = await _context.HiringDecisions
                .CountAsync(d => d.Decision == "Rejected");

            var summary = new
            {
                TotalInterviewsScheduled = totalInterviews,
                TotalEvaluationsCompleted = totalEvaluations,
                TotalDecisionsMade = totalDecisions,
                AcceptedCount = offersAccepted,
                RejectedCount = offersRejected,
                ConversionRate = totalDecisions > 0 
                    ? Math.Round((double)offersAccepted / totalDecisions * 100, 1) 
                    : 0.0
            };

            return Ok(summary);
        }
    }
}
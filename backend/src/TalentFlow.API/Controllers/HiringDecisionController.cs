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
    [Authorize(Roles = "HiringManager")] // Securely consumes the team authentication structure
    public class HiringDecisionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HiringDecisionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. POST: api/hiringdecision/make
        [HttpPost("make")]
        public async Task<IActionResult> MakeDecision([FromBody] HiringDecision decision)
        {
            if (decision == null)
            {
                return BadRequest("Decision data cannot be null.");
            }

            decision.Id = Guid.NewGuid();
            _context.HiringDecisions.Add(decision);
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
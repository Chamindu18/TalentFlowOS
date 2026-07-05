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
    [Authorize(Roles = "HiringManager")] // Secures the endpoint for Hiring Managers
    public class EvaluationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EvaluationController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. POST: api/evaluation/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateEvaluation([FromBody] Evaluation evaluation)
        {
            if (evaluation == null)
            {
                return BadRequest("Evaluation data cannot be null.");
            }

            evaluation.Id = Guid.NewGuid();
            _context.Evaluations.Add(evaluation);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Candidate evaluation score recorded successfully.", evaluationId = evaluation.Id });
        }

        // 2. GET: api/evaluation/application/{applicationId}
        [HttpGet("application/{applicationId}")]
        public async Task<IActionResult> GetEvaluationsByApplication(Guid applicationId)
        {
            var evaluations = await _context.Evaluations
                .Where(e => e.ApplicationId == applicationId)
                .ToListAsync();

            return Ok(evaluations);
        }
    }
}
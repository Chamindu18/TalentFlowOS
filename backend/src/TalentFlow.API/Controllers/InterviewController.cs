using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "HiringManager")] // Consuming the team authentication structure
    public class InterviewController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InterviewController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. POST: api/interview/schedule
        [HttpPost("schedule")]
        public async Task<IActionResult> ScheduleInterview([FromBody] Interview interview)
        {
            if (interview == null)
            {
                return BadRequest("Interview data is required.");
            }

            interview.Id = Guid.NewGuid();
            _context.Interviews.Add(interview);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Interview scheduled successfully", interviewId = interview.Id });
        }

        // 2. GET: api/interview/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInterviewById(Guid id)
        {
            var interview = await _context.Interviews
                .Include(i => i.Schedules)
                .Include(i => i.Feedbacks)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (interview == null)
            {
                return NotFound($"Interview with ID {id} not found.");
            }

            return Ok(interview);
        }
    }
}
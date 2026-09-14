using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TalentFlow.Domain.Entities;
using TalentFlow.Infrastructure.Persistence.Contexts;

namespace TalentFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "HiringManager")]
    public class InterviewController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InterviewController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. GET: api/interview/today - Returns today's interviews for the HiringManager's company
        [HttpGet("today")]
        public async Task<IActionResult> GetTodaysInterviews()
        {
            // Get the authenticated user's company ID
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
            if (user == null || user.CompanyId == null)
                return Forbid("User not associated with a company.");

            var today = DateTime.UtcNow.Date;
            var tomorrow = today.AddDays(1);

            var interviews = await _context.Interviews
                .Include(i => i.Application)
                    .ThenInclude(a => a.Job)
                .Include(i => i.Application)
                    .ThenInclude(a => a.Candidate)
                .Include(i => i.Schedules)
                .Where(i => !i.IsDeleted 
                    && i.Application != null 
                    && i.Application.Job != null 
                    && i.Application.Job.CompanyId == user.CompanyId.Value
                    && i.Schedules.Any(s => s.ScheduledTime >= today && s.ScheduledTime < tomorrow))
                .Select(i => new
                {
                    id = i.Id.ToString(),
                    candidateName = i.Application != null && i.Application.Candidate != null
                        ? $"{i.Application.Candidate.FirstName} {i.Application.Candidate.LastName}"
                        : "Unknown",
                    interviewType = i.InterviewType,
                    timeLabel = i.Schedules != null && i.Schedules.Any()
                        ? i.Schedules.OrderBy(s => s.ScheduledTime).First().ScheduledTime.ToString("HH:mm")
                        : string.Empty,
                    status = (i.Status == 1 ? "Scheduled" : i.Status == 2 ? "Completed" : i.Status == 3 ? "Cancelled" : i.Status == 4 ? "Rejected" : i.Status == 5 ? "Passed" : "Unknown")
                })
                .ToListAsync();

            return Ok(interviews);
        }

        // 2. GET: api/interview
        [HttpGet]
        public async Task<IActionResult> GetInterviews()
        {
            var interviews = await _context.Interviews
                .Include(i => i.Application)
                    .ThenInclude(a => a.Job)
                .Include(i => i.Application)
                    .ThenInclude(a => a.Candidate)
                .Include(i => i.Schedules)
                .Where(i => !i.IsDeleted)
                .Select(i => new
                {
                    id = i.Id.ToString(),
#pragma warning disable CS8602 // Dereference of a possibly null reference - expression tree translated to SQL handles nulls
                    candidateName = i.Application != null && i.Application.Candidate != null
                        ? $"{i.Application.Candidate.FirstName} {i.Application.Candidate.LastName}"
                        : "Unknown",
                    position = i.Application != null && i.Application.Job != null
                        ? i.Application.Job.Title
                        : "Unknown",
#pragma warning restore CS8602
                    interviewDate = i.Schedules != null && i.Schedules.Any()
                        ? i.Schedules.OrderBy(s => s.ScheduledTime).First().ScheduledTime.ToString("yyyy-MM-dd")
                        : string.Empty,
                    interviewTime = i.Schedules != null && i.Schedules.Any()
                        ? i.Schedules.OrderBy(s => s.ScheduledTime).First().ScheduledTime.ToString("HH:mm")
                        : string.Empty
                })
                .ToListAsync();

            return Ok(interviews);
        }

        // 3. POST: api/interview/schedule
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

        // 4. GET: api/interview/{id}
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
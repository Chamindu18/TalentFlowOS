using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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

        [HttpGet("today")]
        public async Task<IActionResult> GetTodaysInterviews()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
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

        [HttpGet]
        public async Task<IActionResult> GetInterviews()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
            if (user == null || user.CompanyId == null)
                return Forbid("User not associated with a company.");

            var interviews = await _context.Interviews
                .Include(i => i.Application)
                    .ThenInclude(a => a.Job)
                .Include(i => i.Application)
                    .ThenInclude(a => a.Candidate)
                .Include(i => i.Schedules)
                .Where(i => !i.IsDeleted
                    && i.Application != null
                    && i.Application.Job != null
                    && i.Application.Job.CompanyId == user.CompanyId.Value)
                .Select(i => new
                {
                    id = i.Id.ToString(),
                    candidateName = i.Application != null && i.Application.Candidate != null
                        ? $"{i.Application.Candidate.FirstName} {i.Application.Candidate.LastName}"
                        : "Unknown",
                    position = i.Application != null && i.Application.Job != null
                        ? i.Application.Job.Title
                        : "Unknown",
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

        [HttpPost("schedule")]
        public async Task<IActionResult> ScheduleInterview([FromBody] ScheduleInterviewRequest request)
        {
            if (request == null)
            {
                return BadRequest("Interview data is required.");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
            if (user == null || user.CompanyId == null)
                return Forbid("User not associated with a company.");

            var application = await _context.JobApplications
                .Include(a => a.Job)
                .FirstOrDefaultAsync(a => a.Id == request.ApplicationId);
            if (application == null)
            {
                return NotFound($"Application with ID {request.ApplicationId} not found.");
            }

            if (application.Job == null || application.Job.CompanyId != user.CompanyId.Value)
            {
                return Forbid("You are not authorized to schedule interviews for this application.");
            }

            if (application.Status != "Shortlisted")
            {
                return BadRequest($"Can only schedule interviews for shortlisted applications. Current status: {application.Status}");
            }

            var interview = new Interview
            {
                Id = Guid.NewGuid(),
                ApplicationId = request.ApplicationId,
                RoundNumber = request.RoundNumber,
                InterviewType = request.InterviewType,
                Status = 1,
                Notes = request.Notes,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false
            };

            if (request.ScheduledTime.HasValue)
            {
                interview.Schedules = new List<InterviewSchedule>
                {
                    new InterviewSchedule
                    {
                        Id = Guid.NewGuid(),
                        InterviewId = interview.Id,
                        ScheduledTime = request.ScheduledTime.Value,
                        DurationMinutes = request.DurationMinutes,
                        LocationOrLink = request.LocationOrLink,
                        InterviewerId = user.Id,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    }
                };
            }

            application.Status = "Interview";
            application.UpdatedAt = DateTime.UtcNow;
            _context.JobApplications.Update(application);

            _context.Interviews.Add(interview);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Interview scheduled successfully", interviewId = interview.Id });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInterviewById(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));
            if (user == null || user.CompanyId == null)
                return Forbid("User not associated with a company.");

            var interview = await _context.Interviews
                .Include(i => i.Application)
                    .ThenInclude(a => a.Job)
                .Include(i => i.Schedules)
                .Include(i => i.Feedbacks)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (interview == null)
            {
                return NotFound($"Interview with ID {id} not found.");
            }

            if (interview.Application == null || interview.Application.Job == null || interview.Application.Job.CompanyId != user.CompanyId.Value)
            {
                return Forbid("You are not authorized to view this interview.");
            }

            return Ok(interview);
        }
    }

    public class ScheduleInterviewRequest
    {
        public Guid ApplicationId { get; set; }
        public int RoundNumber { get; set; } = 1;
        public string InterviewType { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public DateTime? ScheduledTime { get; set; }
        public int DurationMinutes { get; set; } = 45;
        public string? LocationOrLink { get; set; }
    }
}
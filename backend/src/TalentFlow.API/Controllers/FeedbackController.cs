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
    [Authorize(Roles = "HiringManager")] // Restricts access to Hiring Managers per system rules
    public class FeedbackController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FeedbackController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. POST: api/feedback/submit
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitFeedback([FromBody] InterviewFeedback feedback)
        {
            if (feedback == null)
            {
                return BadRequest("Feedback data cannot be empty.");
            }

            feedback.Id = Guid.NewGuid();
            _context.InterviewFeedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Interview feedback saved successfully.", feedbackId = feedback.Id });
        }

        // 2. GET: api/feedback/interview/{interviewId}
        [HttpGet("interview/{interviewId}")]
        public async Task<IActionResult> GetFeedbackByInterview(Guid interviewId)
        {
            var feedbackList = await _context.InterviewFeedbacks
                .Where(f => f.InterviewId == interviewId)
                .ToListAsync();

            return Ok(feedbackList);
        }
    }
}
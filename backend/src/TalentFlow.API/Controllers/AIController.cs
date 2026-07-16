using Microsoft.AspNetCore.Mvc;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    [HttpGet("resume-matching")]
    public IActionResult ResumeMatching()
    {
        return Ok(new
        {
            success = true,
            data = new
            {
                Candidate = "John Doe",
                MatchScore = 85,
                RecommendedPosition = "Backend Developer"
            }
        });
    }

    [HttpGet("job-recommendations")]
    public IActionResult JobRecommendations()
    {
        var jobs = new[]
        {
            new
            {
                Title = "Backend Developer",
                MatchScore = 90
            },
            new
            {
                Title = "Frontend Developer",
                MatchScore = 88
            },
            new
            {
                Title = "QA Engineer",
                MatchScore = 85
            }
        };

        return Ok(new
        {
            success = true,
            data = jobs
        });
    }
}
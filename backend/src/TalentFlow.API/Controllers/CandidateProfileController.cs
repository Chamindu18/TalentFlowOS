using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using TalentFlow.Application.DTOs.Candidate;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Candidate")]
    public class CandidateProfileController : ControllerBase
    {
        private readonly ICandidateService _candidateService;

        public CandidateProfileController(ICandidateService candidateService)
        {
            _candidateService = candidateService;
        }

       
        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var profile = await _candidateService.GetProfileByUserIdAsync(userId);
            
            if (profile == null) return NotFound("Candidate profile not found.");
            return Ok(profile);
        }

        
        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateCandidateProfileDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var updatedProfile = await _candidateService.UpdateProfileAsync(userId, dto);
            return Ok(updatedProfile);
        }

       
        [HttpPost("education")]
        public async Task<IActionResult> AddEducation([FromBody] EducationDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var result = await _candidateService.AddEducationAsync(userId, dto);
            
            if (!result) return BadRequest("Failed to add education details.");
            return Ok(new { message = "Education details added successfully!" });
        }

        
        [HttpPost("experience")]
        public async Task<IActionResult> AddExperience([FromBody] ExperienceDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var result = await _candidateService.AddExperienceAsync(userId, dto);
            
            if (!result) return BadRequest("Failed to add experience details.");
            return Ok(new { message = "Experience details added successfully!" });
        }

        
        [HttpPost("skills")]
        public async Task<IActionResult> AddSkill([FromBody] SkillDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var result = await _candidateService.AddSkillAsync(userId, dto);
            
            if (!result) return BadRequest("Failed to add skill.");
            return Ok(new { message = "Skill added successfully!" });
        }

        
        [HttpPost("certificates")]
        public async Task<IActionResult> AddCertificate([FromBody] CertificateDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var result = await _candidateService.AddCertificateAsync(userId, dto);
            
            if (!result) return BadRequest("Failed to add certificate.");
            return Ok(new { message = "Certificate added successfully!" });
        }
    }
}
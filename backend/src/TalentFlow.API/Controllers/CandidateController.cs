using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TalentFlow.Application.Interfaces.Services; 
using TalentFlow.Application.DTOs.Candidate;

namespace TalentFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] 
    public class CandidateController : ControllerBase
    {
        private readonly ICandidateService _candidateService;

        public CandidateController(ICandidateService candidateService)
        {
            _candidateService = candidateService;
        }
       
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var profile = await _candidateService.GetProfileByUserIdAsync(userId);
            if (profile == null) return NotFound(new { message = "Candidate profile not found." });

            return Ok(profile);
        }
        
        [HttpPost("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateCandidateProfileDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var updatedProfile = await _candidateService.UpdateProfileAsync(userId, dto);
            return Ok(updatedProfile);
        }

        [HttpPost("education")]
        public async Task<IActionResult> AddEducation([FromBody] EducationDto educationDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();
           
            var result = await _candidateService.AddEducationAsync(userId, educationDto);
            return result ? Ok(new { message = "Education added successfully!" }) : BadRequest("Could not add education details.");
        }

        [HttpPost("experience")]
        public async Task<IActionResult> AddExperience([FromBody] ExperienceDto experienceDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var result = await _candidateService.AddExperienceAsync(userId, experienceDto);
            return result ? Ok(new { message = "Experience added successfully!" }) : BadRequest("Could not add experience.");
        }

        [HttpPost("skills")]
        public async Task<IActionResult> AddSkill([FromBody] SkillDto skillDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var result = await _candidateService.AddSkillAsync(userId, skillDto);
            return result ? Ok(new { message = "Skill added successfully!" }) : BadRequest("Could not add skill.");
        }

        [HttpPost("certificates")]
        public async Task<IActionResult> AddCertificate([FromBody] CertificateDto certificateDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var result = await _candidateService.AddCertificateAsync(userId, certificateDto);
            return result ? Ok(new { message = "Certificate added successfully!" }) : BadRequest("Could not add certificate.");
        }
    } 
}
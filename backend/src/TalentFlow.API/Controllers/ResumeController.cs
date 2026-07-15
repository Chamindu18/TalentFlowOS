using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Candidate")]
    public class ResumeController : ControllerBase
    {
        private readonly ICandidateService _candidateService;

        public ResumeController(ICandidateService candidateService)
        {
            _candidateService = candidateService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadResume(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Please upload a valid PDF or Word document.");

            var extension = Path.GetExtension(file.FileName).ToLower();
            if (extension != ".pdf" && extension != ".docx" && extension != ".doc")
                return BadRequest("Only .pdf, .doc, and .docx files are allowed.");

            var candidateId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

           
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var fileBytes = memoryStream.ToArray();

                
                var fileUrl = await _candidateService.UploadResumeAsync(candidateId, file.FileName, fileBytes);
                
                return Ok(new { message = "Resume uploaded successfully!", resumeUrl = fileUrl });
            }
        }
    }
}
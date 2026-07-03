using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumeController : ControllerBase
    {
        private readonly IResumeService _resumeService;

        public ResumeController(IResumeService resumeService)
        {
            _resumeService = resumeService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(Guid candidateId, IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0) 
                    return BadRequest("File is empty or null.");

                // IFormFile එකෙන් Stream එක අරන් Service එකට pass කරනවා
                using (var stream = file.OpenReadStream())
                {
                    var filePath = await _resumeService.UploadResumeAsync(candidateId, stream, file.FileName);
                    return Ok(new { message = "Resume uploaded successfully!", path = filePath });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("download/{candidateId}")]
        public async Task<IActionResult> Download(Guid candidateId)
        {
            try
            {
                var (fileStream, contentType, fileName) = await _resumeService.DownloadResumeAsync(candidateId);
                return File(fileStream, contentType, fileName);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
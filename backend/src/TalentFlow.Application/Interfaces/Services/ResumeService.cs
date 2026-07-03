using System;
using System.IO;
using System.Threading.Tasks;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.Application.Services
{
    public class ResumeService : IResumeService
    {
        private readonly string _storagePath;

        public ResumeService()
        {
           
            _storagePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", "Resumes");
            
            if (!Directory.Exists(_storagePath))
            {
                Directory.CreateDirectory(_storagePath);
            }
        }

        public async Task<string> UploadResumeAsync(Guid candidateId, Stream fileStream, string fileName)
        {
            if (fileStream == null || fileStream.Length == 0)
                throw new ArgumentException("Invalid file.");

            
            var savedFileName = $"{candidateId}_{Path.GetFileName(fileName)}";
            var filePath = Path.Combine(_storagePath, savedFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await fileStream.CopyToAsync(stream);
            }

            return filePath; 
        }

        public async Task<(Stream fileStream, string contentType, string fileName)> DownloadResumeAsync(Guid candidateId)
        {
            
            var memoryStream = new MemoryStream();
            var writer = new StreamWriter(memoryStream);
            writer.Write("Fake Resume Content");
            writer.Flush();
            memoryStream.Position = 0;

            return (memoryStream, "application/pdf", "resume.pdf");
        }
    }
}
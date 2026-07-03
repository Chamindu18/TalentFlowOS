using System;
using System.IO;
using System.Threading.Tasks;

namespace TalentFlow.Application.Interfaces.Services
{
    public interface IResumeService
    {
        Task<string> UploadResumeAsync(Guid candidateId, Stream fileStream, string fileName);
        Task<(Stream fileStream, string contentType, string fileName)> DownloadResumeAsync(Guid candidateId);
    }
}

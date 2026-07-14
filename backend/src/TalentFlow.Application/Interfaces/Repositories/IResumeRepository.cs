namespace TalentFlow.Application.Interfaces.Repositories;

public interface IResumeRepository
{
    Task<string> UploadResumeAsync(string candidateId, string filePath);
    Task<string?> GetResumePathAsync(string candidateId);
}
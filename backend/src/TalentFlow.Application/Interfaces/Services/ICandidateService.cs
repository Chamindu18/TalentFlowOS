using System;
using System.Threading.Tasks;
using TalentFlow.Application.DTOs.Candidate;

namespace TalentFlow.Application.Interfaces.Services
{
    public interface ICandidateService
    {
        
        Task<CandidateProfileDto?> GetProfileByUserIdAsync(string userId);

        
        Task<CandidateProfileDto> UpdateProfileAsync(string userId, UpdateCandidateProfileDto dto);
    }
}
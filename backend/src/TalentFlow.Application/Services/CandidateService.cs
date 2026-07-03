using System;
using System.Threading.Tasks;
using AutoMapper;

using TalentFlow.Application.DTOs.Candidate;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Services
{
    public class CandidateService : ICandidateService
    {


        public CandidateService()
        {
           
        }

        public async Task<CandidateProfileDto?> GetProfileByUserIdAsync(string userId)
        {
            
            return new CandidateProfileDto
            {
                Id = Guid.NewGuid(),
                FirstName = "Test",
                LastName = "Candidate",
                Phone = "0771234567",
                Bio = "Software Engineering Student",
                IsProfileComplete = true
            };
        }

        public async Task<CandidateProfileDto> UpdateProfileAsync(string userId, UpdateCandidateProfileDto dto)
        {
            
            return new CandidateProfileDto
            {
                Id = Guid.NewGuid(),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Phone = dto.Phone,
                Bio = dto.Bio,
                IsProfileComplete = true
            };
        }
    }
}
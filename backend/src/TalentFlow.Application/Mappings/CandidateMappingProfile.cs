using AutoMapper;
using TalentFlow.Application.DTOs.Candidate;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Mappings
{
    public class CandidateMappingProfile : Profile
    {
        public CandidateMappingProfile()
        {
            
            CreateMap<Candidate, CandidateProfileDto>();

            
            CreateMap<UpdateCandidateProfileDto, Candidate>();
        }
    }
}
using AutoMapper;
using TalentFlow.Application.Interfaces.Services;
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

            
            CreateMap<Education, EducationDto>().ReverseMap();
            CreateMap<Experience, ExperienceDto>().ReverseMap();
            CreateMap<Skill, SkillDto>().ReverseMap();
            CreateMap<Certificate, CertificateDto>().ReverseMap();
        }
    }
}
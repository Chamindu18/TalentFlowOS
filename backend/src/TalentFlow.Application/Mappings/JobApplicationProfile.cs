using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using TalentFlow.Application.DTOs.Applications;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Mappings;

public class JobApplicationProfile : Profile
{
    public JobApplicationProfile()
    {
        // Entity to DTO
        CreateMap<JobApplication, ApplicationResponseDTO>()
            .ForMember(dest => dest.JobTitle, opt => opt.MapFrom(src => src.Job != null ? src.Job.Title : string.Empty))
            .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Job != null && src.Job.Company != null ? src.Job.Company.Name : string.Empty))
            .ForMember(dest => dest.CandidateName, opt => opt.MapFrom(src => src.Candidate != null ? $"{src.Candidate.FirstName} {src.Candidate.LastName}" : "Unknown"));

        // DTO to Entity
        CreateMap<CreateApplicationRequestDTO, JobApplication>();
    }
}

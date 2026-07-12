using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using TalentFlow.Application.DTOs.Jobs;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Mappings;

public class JobProfile : Profile
{
    public JobProfile()
    {
        // Entity to DTO
        CreateMap<Job, JobResponseDTO>()
            .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company != null ? src.Company.Name : string.Empty))
            .ForMember(dest => dest.DepartmentName, opt => opt.MapFrom(src => src.Department != null ? src.Department.Name : string.Empty))
            .ForMember(dest => dest.ApplicationCount, opt => opt.MapFrom(src => src.JobApplications != null ? src.JobApplications.Count : 0));

        // DTO to Entity
        CreateMap<CreateJobRequestDTO, Job>()

            .ForMember(dest => dest.CompanyId, opt => opt.Ignore())
            .ForMember(dest => dest.DepartmentId, opt => opt.Ignore())
            .ForMember(dest => dest.Company, opt => opt.Ignore())
            .ForMember(dest => dest.Department, opt => opt.Ignore());



        // Update DTO to Entity
        CreateMap<UpdateJobRequestDTO, Job>()

            .ForMember(dest => dest.CompanyId, opt => opt.Ignore())
            .ForMember(dest => dest.DepartmentId, opt => opt.Ignore());
    }
}

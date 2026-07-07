using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using TalentFlow.Application.DTOs.Jobs;
using TalentFlow.Application.Exceptions;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Domain.Entities;
using TalentFlow.Domain.Enums;

namespace TalentFlow.Application.Services;

public class JobService : IJobService
{
    private readonly IJobRepository _jobRepository;
    private readonly ICompanyRepository _companyRepository;
    private readonly IDepartmentRepository _departmentRepository;
    private readonly IMapper _mapper;

    public JobService(
        IJobRepository jobRepository,
        ICompanyRepository companyRepository,
        IDepartmentRepository departmentRepository,
        IMapper mapper)
    {
        _jobRepository = jobRepository;
        _companyRepository = companyRepository;
        _departmentRepository = departmentRepository;
        _mapper = mapper;
    }

    public async Task<JobResponseDTO> GetByIdAsync(Guid id)
    {
        var job = await _jobRepository.GetByIdAsync(id);

        if (job == null)
            throw new NotFoundException($"Job with ID {id} not found");

        return _mapper.Map<JobResponseDTO>(job);
    }

    public async Task<IEnumerable<JobResponseDTO>> GetAllAsync()
    {
        var jobs = await _jobRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<JobResponseDTO>>(jobs);
    }

    public async Task<IEnumerable<JobResponseDTO>> GetActiveJobsAsync()
    {
        var jobs = await _jobRepository.GetActiveJobsAsync();
        return _mapper.Map<IEnumerable<JobResponseDTO>>(jobs);
    }

    public async Task<IEnumerable<JobResponseDTO>> GetJobsByCompanyAsync(Guid companyId)
    {
        var company = await _companyRepository.ExistsAsync(companyId);
        if (!company)
            throw new NotFoundException($"Company with ID {companyId} not found");

        var jobs = await _jobRepository.GetByCompanyIdAsync(companyId);
        return _mapper.Map<IEnumerable<JobResponseDTO>>(jobs);
    }

    public async Task<IEnumerable<JobResponseDTO>> GetJobsByDepartmentAsync(Guid departmentId)
    {
        var department = await _departmentRepository.ExistsAsync(departmentId);
        if (!department)
            throw new NotFoundException($"Department with ID {departmentId} not found");

        var jobs = await _jobRepository.GetByDepartmentIdAsync(departmentId);
        return _mapper.Map<IEnumerable<JobResponseDTO>>(jobs);
    }

    public async Task<IEnumerable<JobResponseDTO>> SearchJobsAsync(
        string? searchTerm,
        string? location,
        string? employmentType)
    {
        var jobs = await _jobRepository.SearchJobsAsync(searchTerm, location, employmentType);
        return _mapper.Map<IEnumerable<JobResponseDTO>>(jobs);
    }

    public async Task<JobResponseDTO> CreateAsync(CreateJobRequestDTO request)
    {
        // Validate Company exists
        var companyExists = await _companyRepository.ExistsAsync(request.CompanyId);
        if (!companyExists)
            throw new NotFoundException($"Company with ID {request.CompanyId} not found");

        // Validate Department exists
        var departmentExists = await _departmentRepository.ExistsAsync(request.DepartmentId);
        if (!departmentExists)
            throw new NotFoundException($"Department with ID {request.DepartmentId} not found");

        // Validate Salary Range
        if (request.SalaryMin.HasValue && request.SalaryMax.HasValue)
        {
            if (request.SalaryMin > request.SalaryMax)
                throw new BusinessRuleException("Minimum salary cannot be greater than maximum salary");
        }

        // Map DTO to Entity
        var job = _mapper.Map<Job>(request);
        job.Status = JobStatus.Open.ToString();
        job.IsActive = true;

        await _jobRepository.AddAsync(job);
        await _jobRepository.SaveChangesAsync();

        return _mapper.Map<JobResponseDTO>(job);
    }

    public async Task<JobResponseDTO> UpdateAsync(Guid id, UpdateJobRequestDTO request)
    {
        var job = await _jobRepository.GetByIdAsync(id);
        if (job == null)
            throw new NotFoundException($"Job with ID {id} not found");

        // Validate Company exists
        var companyExists = await _companyRepository.ExistsAsync(request.CompanyId);
        if (!companyExists)
            throw new NotFoundException($"Company with ID {request.CompanyId} not found");

        // Validate Department exists
        var departmentExists = await _departmentRepository.ExistsAsync(request.DepartmentId);
        if (!departmentExists)
            throw new NotFoundException($"Department with ID {request.DepartmentId} not found");

        // Validate Salary Range
        if (request.SalaryMin.HasValue && request.SalaryMax.HasValue)
        {
            if (request.SalaryMin > request.SalaryMax)
                throw new BusinessRuleException("Minimum salary cannot be greater than maximum salary");
        }

        // Update entity
        _mapper.Map(request, job);
        job.UpdatedAt = DateTime.UtcNow;

        _jobRepository.Update(job);
        await _jobRepository.SaveChangesAsync();

        return _mapper.Map<JobResponseDTO>(job);
    }

    public async Task DeleteAsync(Guid id)
    {
        var job = await _jobRepository.GetByIdAsync(id);
        if (job == null)
            throw new NotFoundException($"Job with ID {id} not found");

        _jobRepository.Delete(job);
        await _jobRepository.SaveChangesAsync();
    }

    public async Task CloseJobAsync(Guid id)
    {
        var job = await _jobRepository.GetByIdAsync(id);
        if (job == null)
            throw new NotFoundException($"Job with ID {id} not found");

        job.Status = JobStatus.Closed.ToString();
        job.IsActive = false;
        job.UpdatedAt = DateTime.UtcNow;

        _jobRepository.Update(job);
        await _jobRepository.SaveChangesAsync();
    }
}

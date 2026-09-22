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

    public async Task<JobResponseDTO> CreateAsync(CreateJobRequestDTO request, Guid? userCompanyId = null)
    {

        // Log the request
    Console.WriteLine($"CompanyName: {request.CompanyName}");
    Console.WriteLine($"DepartmentName: {request.DepartmentName}");


        // Find company by name
        var company = await _companyRepository.GetByNameAsync(request.CompanyName);
        if (company == null)
        {
            throw new NotFoundException($"Company '{request.CompanyName}' not found. Please create the company first.");
        }

        // Validate that the recruiter belongs to this company (if userCompanyId is provided)
        if (userCompanyId.HasValue && company.Id != userCompanyId.Value)
        {
            throw new UnauthorizedException("You can only create jobs for your own company.");
        }

        // Find department by name within the company
        var department = await _departmentRepository.GetByNameAndCompanyAsync(request.DepartmentName, company.Id);
        if (department == null)
        {
            throw new NotFoundException($"Department '{request.DepartmentName}' not found in company '{request.CompanyName}'. Please create the department first.");
        }

        // Validate Salary Range
        if (request.SalaryMin.HasValue && request.SalaryMax.HasValue)
        {
            if (request.SalaryMin > request.SalaryMax)
                throw new BusinessRuleException("Minimum salary cannot be greater than maximum salary");
        }

        // Map DTO to Entity
        var job = _mapper.Map<Job>(request);
        job.CompanyId = company.Id;
        job.DepartmentId = department.Id;
        job.Status = JobStatus.Open.ToString();
        job.IsActive = true;

        await _jobRepository.AddAsync(job);
        await _jobRepository.SaveChangesAsync();

        return _mapper.Map<JobResponseDTO>(job);
    }

    public async Task<JobResponseDTO> UpdateAsync(Guid id, UpdateJobRequestDTO request, Guid? userCompanyId = null)
    {
        var job = await _jobRepository.GetByIdAsync(id);
        if (job == null)
            throw new NotFoundException($"Job with ID {id} not found");

        // Validate that the recruiter belongs to this company (if userCompanyId is provided)
        if (userCompanyId.HasValue && job.CompanyId != userCompanyId.Value)
        {
            throw new UnauthorizedException("You can only update jobs for your own company.");
        }

        // Validate Company exists
        var companyExists = await _companyRepository.ExistsAsync(request.CompanyId);
        if (!companyExists)
            throw new NotFoundException($"Company with ID {request.CompanyId} not found");

        // Validate that the company matches the job's company (prevent changing company)
        if (request.CompanyId != job.CompanyId)
        {
            throw new BusinessRuleException("Cannot change the company of an existing job.");
        }

        // Validate Department exists
        var departmentExists = await _departmentRepository.ExistsAsync(request.DepartmentId);
        if (!departmentExists)
            throw new NotFoundException($"Department with ID {request.DepartmentId} not found");

        // Validate that the department belongs to the same company
        var department = await _departmentRepository.GetByIdAsync(request.DepartmentId);
        if (department == null || department.CompanyId != job.CompanyId)
        {
            throw new BusinessRuleException("Department does not belong to the job's company.");
        }

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

    public async Task DeleteAsync(Guid id, Guid? userCompanyId = null)
    {
        var job = await _jobRepository.GetByIdAsync(id);
        if (job == null)
            throw new NotFoundException($"Job with ID {id} not found");

        if (userCompanyId.HasValue && job.CompanyId != userCompanyId.Value)
        {
            throw new UnauthorizedException("You can only delete jobs for your own company.");
        }

        _jobRepository.Delete(job);
        await _jobRepository.SaveChangesAsync();
    }

    public async Task CloseJobAsync(Guid id, Guid? userCompanyId = null)
    {
        var job = await _jobRepository.GetByIdAsync(id);
        if (job == null)
            throw new NotFoundException($"Job with ID {id} not found");

        if (userCompanyId.HasValue && job.CompanyId != userCompanyId.Value)
        {
            throw new UnauthorizedException("You can only close jobs for your own company.");
        }

        job.Status = JobStatus.Closed.ToString();
        job.IsActive = false;
        job.UpdatedAt = DateTime.UtcNow;

        _jobRepository.Update(job);
        await _jobRepository.SaveChangesAsync();
    }
}
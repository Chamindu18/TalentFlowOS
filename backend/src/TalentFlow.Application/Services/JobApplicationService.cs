using AutoMapper;
using TalentFlow.Application.DTOs.Applications;
using TalentFlow.Application.Exceptions;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Domain.Entities;
using TalentFlow.Domain.Enums;

namespace TalentFlow.Application.Services;

public class JobApplicationService : IApplicationService
{
    private readonly IApplicationRepository _applicationRepository;
    private readonly IJobRepository _jobRepository;
    private readonly ICandidateRepository _candidateRepository;
    private readonly IMapper _mapper;

    public JobApplicationService(
        IApplicationRepository applicationRepository,
        IJobRepository jobRepository,
        ICandidateRepository candidateRepository,
        IMapper mapper)
    {
        _applicationRepository = applicationRepository;
        _jobRepository = jobRepository;
        _candidateRepository = candidateRepository;
        _mapper = mapper;
    }

    public async Task<ApplicationResponseDTO> GetByIdAsync(Guid id)
    {
        var application = await _applicationRepository.GetByIdAsync(id);

        if (application == null)
            throw new NotFoundException($"Application with ID {id} not found");

        return _mapper.Map<ApplicationResponseDTO>(application);
    }

    public async Task<IEnumerable<ApplicationResponseDTO>> GetByCandidateIdAsync(Guid candidateId)
    {
        var applications = await _applicationRepository.GetByCandidateIdAsync(candidateId);
        return _mapper.Map<IEnumerable<ApplicationResponseDTO>>(applications);
    }

    public async Task<IEnumerable<ApplicationResponseDTO>> GetByJobIdAsync(Guid jobId)
    {
        var applications = await _applicationRepository.GetByJobIdAsync(jobId);
        return _mapper.Map<IEnumerable<ApplicationResponseDTO>>(applications);
    }

    public async Task<IEnumerable<ApplicationResponseDTO>> GetAllAsync()
    {
        var applications = await _applicationRepository.GetApplicationsWithDetailsAsync();
        return _mapper.Map<IEnumerable<ApplicationResponseDTO>>(applications);
    }

    // ============================================================
    // CREATE APPLICATION
    // ============================================================

    public async Task<ApplicationResponseDTO> CreateAsync(
        CreateApplicationRequestDTO request,
        string userId)
    {
        // Validate Job
        var job = await _jobRepository.GetByIdAsync(request.JobId);

        if (job == null)
            throw new NotFoundException($"Job with ID {request.JobId} not found");

        if (!job.IsActive)
            throw new BusinessRuleException("This job is no longer accepting applications");

        // Find Candidate using logged-in user
        var candidate = await _candidateRepository.GetCandidateByUserIdAsync(userId);

        if (candidate == null)
            throw new NotFoundException("Candidate profile not found.");

        // Prevent duplicate applications
        var alreadyApplied =
            await _applicationRepository.HasCandidateAppliedAsync(
                candidate.Id,
                request.JobId);

        if (alreadyApplied)
            throw new BusinessRuleException("You have already applied for this job.");

        // Create application
        var application = _mapper.Map<JobApplication>(request);

        application.CandidateId = candidate.Id;
        application.JobId = request.JobId;
        application.Status = ApplicationStatus.Applied.ToString();
        application.AppliedAt = DateTime.UtcNow;
        application.CreatedAt = DateTime.UtcNow;
        application.UpdatedAt = DateTime.UtcNow;
        application.IsDeleted = false;

        await _applicationRepository.AddAsync(application);
        await _applicationRepository.SaveChangesAsync();

        return _mapper.Map<ApplicationResponseDTO>(application);
    }

    // ============================================================
    // UPDATE STATUS
    // ============================================================

    public async Task<ApplicationResponseDTO> UpdateStatusAsync(
        Guid id,
        UpdateApplicationStatusRequestDTO request)
    {
        var application = await _applicationRepository.GetByIdAsync(id);

        if (application == null)
            throw new NotFoundException($"Application with ID {id} not found");

        if (!Enum.TryParse<ApplicationStatus>(request.Status, true, out _))
            throw new BusinessRuleException($"Invalid status: {request.Status}");

        application.Status = request.Status;
        application.UpdatedAt = DateTime.UtcNow;

        _applicationRepository.Update(application);
        await _applicationRepository.SaveChangesAsync();

        return _mapper.Map<ApplicationResponseDTO>(application);
    }

    // ============================================================
    // DELETE
    // ============================================================

    public async Task DeleteAsync(Guid id)
    {
        var application = await _applicationRepository.GetByIdAsync(id);

        if (application == null)
            throw new NotFoundException($"Application with ID {id} not found");

        _applicationRepository.Delete(application);

        await _applicationRepository.SaveChangesAsync();
    }

    // ============================================================
    // CHECK DUPLICATES
    // ============================================================

    public async Task<bool> HasCandidateAppliedAsync(Guid candidateId, Guid jobId)
    {
        return await _applicationRepository.HasCandidateAppliedAsync(candidateId, jobId);
    }

    // ============================================================
    // COUNT
    // ============================================================

    public async Task<int> GetApplicationCountForJobAsync(Guid jobId)
    {
        return await _applicationRepository.GetApplicationCountForJobAsync(jobId);
    }

    // ============================================================
    // FILTER
    // ============================================================

    public async Task<IEnumerable<ApplicationResponseDTO>> GetApplicationsByStatusAsync(string status)
    {
        var applications = await _applicationRepository.GetByStatusAsync(status);
        return _mapper.Map<IEnumerable<ApplicationResponseDTO>>(applications);
    }

    // ============================================================
    // SHORTLIST
    // ============================================================

    public async Task ShortlistApplicationAsync(Guid id)
    {
        var application = await _applicationRepository.GetByIdAsync(id);

        if (application == null)
            throw new NotFoundException($"Application with ID {id} not found");

        application.Status = ApplicationStatus.Shortlisted.ToString();
        application.UpdatedAt = DateTime.UtcNow;

        _applicationRepository.Update(application);
        await _applicationRepository.SaveChangesAsync();
    }
}
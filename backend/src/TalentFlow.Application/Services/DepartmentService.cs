using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using TalentFlow.Application.DTOs.Departments;
using TalentFlow.Application.Exceptions;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Services;

public class DepartmentService : IDepartmentService
{
    private readonly IDepartmentRepository _departmentRepository;
    private readonly ICompanyRepository _companyRepository;
    private readonly IMapper _mapper;

    public DepartmentService(
        IDepartmentRepository departmentRepository,
        ICompanyRepository companyRepository,
        IMapper mapper)
    {
        _departmentRepository = departmentRepository;
        _companyRepository = companyRepository;
        _mapper = mapper;
    }


public async Task<Department> GetDefaultDepartmentAsync(Guid companyId)
{
    var departments = await _departmentRepository.GetByCompanyIdAsync(companyId);
    return departments.FirstOrDefault() ?? throw new NotFoundException("No department found");
}
 

    public async Task<DepartmentResponseDTO> GetByIdAsync(Guid id)
    {
        var department = await _departmentRepository.GetByIdAsync(id);
        if (department == null)
            throw new NotFoundException($"Department with ID {id} not found");
        return _mapper.Map<DepartmentResponseDTO>(department);
    }

    public async Task<IEnumerable<DepartmentResponseDTO>> GetByCompanyIdAsync(Guid companyId)
    {
        var departments = await _departmentRepository.GetByCompanyIdAsync(companyId);
        return _mapper.Map<IEnumerable<DepartmentResponseDTO>>(departments);
    }

    public async Task<IEnumerable<DepartmentResponseDTO>> GetAllAsync()
    {
        var departments = await _departmentRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<DepartmentResponseDTO>>(departments);
    }

    public async Task<DepartmentResponseDTO> CreateAsync(CreateDepartmentRequestDTO request)
    {
        var companyExists = await _companyRepository.ExistsAsync(request.CompanyId);
        if (!companyExists)
            throw new NotFoundException($"Company with ID {request.CompanyId} not found");

        var nameExists = await _departmentRepository.NameExistsInCompanyAsync(request.CompanyId, request.Name);
        if (nameExists)
            throw new BusinessRuleException($"Department '{request.Name}' already exists in this company");

        var department = _mapper.Map<Department>(request);
        await _departmentRepository.AddAsync(department);
        await _departmentRepository.SaveChangesAsync();

        return _mapper.Map<DepartmentResponseDTO>(department);
    }

    public async Task<DepartmentResponseDTO> UpdateAsync(Guid id, UpdateDepartmentRequestDTO request)
    {
        var department = await _departmentRepository.GetByIdAsync(id);
        if (department == null)
            throw new NotFoundException($"Department with ID {id} not found");

        _mapper.Map(request, department);
        department.UpdatedAt = DateTime.UtcNow;

        _departmentRepository.Update(department);
        await _departmentRepository.SaveChangesAsync();

        return _mapper.Map<DepartmentResponseDTO>(department);
    }

    public async Task DeleteAsync(Guid id)
    {
        var department = await _departmentRepository.GetByIdAsync(id);
        if (department == null)
            throw new NotFoundException($"Department with ID {id} not found");

        _departmentRepository.Delete(department);
        await _departmentRepository.SaveChangesAsync();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using TalentFlow.Application.DTOs.Companies;
using TalentFlow.Application.Exceptions;
using TalentFlow.Application.Interfaces.Repositories;
using TalentFlow.Application.Interfaces.Services;
using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Services;

public class CompanyService : ICompanyService
{
    private readonly ICompanyRepository _companyRepository;
    private readonly IMapper _mapper;

    public CompanyService(ICompanyRepository companyRepository, IMapper mapper)
    {
        _companyRepository = companyRepository;
        _mapper = mapper;
    }


    public async Task<Company> GetDefaultCompanyAsync()
{
    var company = await _companyRepository.GetAllAsync();
    return company.FirstOrDefault() ?? throw new NotFoundException("No company found");
}


    public async Task<CompanyResponseDTO> GetByIdAsync(Guid id)
    {
        var company = await _companyRepository.GetByIdAsync(id);
        if (company == null)
            throw new NotFoundException($"Company with ID {id} not found");
        return _mapper.Map<CompanyResponseDTO>(company);
    }

    public async Task<IEnumerable<CompanyResponseDTO>> GetAllAsync()
    {
        var companies = await _companyRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<CompanyResponseDTO>>(companies);
    }

    public async Task<IEnumerable<CompanyResponseDTO>> SearchAsync(string? searchTerm)
    {
        var companies = await _companyRepository.SearchCompaniesAsync(searchTerm);
        return _mapper.Map<IEnumerable<CompanyResponseDTO>>(companies);
    }

    public async Task<CompanyResponseDTO> CreateAsync(CreateCompanyRequestDTO request)
    {
        var exists = await _companyRepository.NameExistsAsync(request.Name);
        if (exists)
            throw new BusinessRuleException($"Company with name '{request.Name}' already exists");

        var company = _mapper.Map<Company>(request);
        await _companyRepository.AddAsync(company);
        await _companyRepository.SaveChangesAsync();

        return _mapper.Map<CompanyResponseDTO>(company);
    }

    public async Task<CompanyResponseDTO> UpdateAsync(Guid id, UpdateCompanyRequestDTO request)
    {
        var company = await _companyRepository.GetByIdAsync(id);
        if (company == null)
            throw new NotFoundException($"Company with ID {id} not found");

        _mapper.Map(request, company);
        company.UpdatedAt = DateTime.UtcNow;

        _companyRepository.Update(company);
        await _companyRepository.SaveChangesAsync();

        return _mapper.Map<CompanyResponseDTO>(company);
    }

    public async Task DeleteAsync(Guid id)
    {
        var company = await _companyRepository.GetByIdAsync(id);
        if (company == null)
            throw new NotFoundException($"Company with ID {id} not found");

        _companyRepository.Delete(company);
        await _companyRepository.SaveChangesAsync();
    }
}

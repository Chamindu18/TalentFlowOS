using System;

namespace TalentFlow.Application.DTOs.Candidate
{
    public class CertificateDto
    {
        public string Name { get; set; } = string.Empty;
        public string IssuingOrganization { get; set; } = string.Empty; 
        public DateTime IssueDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? CredentialId { get; set; }
        public string? CredentialUrl { get; set; }
    }
}
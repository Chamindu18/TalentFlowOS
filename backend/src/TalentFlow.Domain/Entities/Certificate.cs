using System;

namespace TalentFlow.Domain.Entities
{
    public class Certificate
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public string Name { get; set; } = string.Empty;         
        public string IssuingOrganization { get; set; } = string.Empty; 
        public DateTime IssueDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public string CredentialUrl { get; set; } = string.Empty;


        public Candidate Candidate { get; set; } = null!;
    }
}
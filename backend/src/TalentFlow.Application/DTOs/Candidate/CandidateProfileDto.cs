using System;

namespace TalentFlow.Application.DTOs.Candidate
{
    public class CandidateProfileDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public bool IsProfileComplete { get; set; }
    }
}
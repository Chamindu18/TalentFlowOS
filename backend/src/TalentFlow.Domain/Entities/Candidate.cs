using System;
using System.Collections.Generic;

namespace TalentFlow.Domain.Entities;

public class Candidate
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string UserId { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public bool IsProfileComplete { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // Navigation Collections
    public ICollection<Education> Educations { get; set; } = new List<Education>();
    public ICollection<Experience> Experiences { get; set; } = new List<Experience>();
    public ICollection<Skill> Skills { get; set; } = new List<Skill>();
    public ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();
}
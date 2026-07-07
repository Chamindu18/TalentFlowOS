using System;

namespace TalentFlow.Domain.Entities
{
    public class Evaluation
    {
        public Guid Id { get; set; }
        public Guid ApplicationId { get; set; }
        public int Score { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
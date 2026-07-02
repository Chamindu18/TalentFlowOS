using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Application.DTOs.Candidate
{
    public class UpdateCandidateProfileDto
    {
        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number is required")]
        public string Phone { get; set; } = string.Empty;

        public string Bio { get; set; } = string.Empty;
    }
}
namespace TalentFlow.Application.Interfaces.Services;

public interface IEmailService
{
    Task SendEmailAsync(
        string to,
        string subject,
        string htmlBody
    );
}
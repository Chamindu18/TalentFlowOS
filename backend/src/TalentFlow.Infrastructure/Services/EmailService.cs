using System.Net;
using System.Net.Mail;

using Microsoft.Extensions.Options;

using TalentFlow.Application.Common.Settings;
using TalentFlow.Application.Interfaces.Services;

namespace TalentFlow.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly EmailSettings _settings;

    public EmailService(
        IOptions<EmailSettings> options
    )
    {
        _settings = options.Value;
    }

    public async Task SendEmailAsync(
        string to,
        string subject,
        string htmlBody
    )
    {
        using var client = new SmtpClient(
            _settings.SmtpServer,
            _settings.Port
        );

        client.Credentials = new NetworkCredential(
            _settings.Username,
            _settings.Password
        );

        client.EnableSsl = true;

        using var message = new MailMessage
        {
            From = new MailAddress(
                _settings.SenderEmail,
                _settings.SenderName
            ),

            Subject = subject,

            Body = htmlBody,

            IsBodyHtml = true
        };

        message.To.Add(to);

        await client.SendMailAsync(message);
    }
}
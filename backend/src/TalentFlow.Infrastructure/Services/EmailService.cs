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
        _settings = options.Value ?? throw new ArgumentNullException(nameof(options));
        ValidateSettings();
    }

    private void ValidateSettings()
    {
        if (string.IsNullOrWhiteSpace(_settings.SmtpServer))
            throw new InvalidOperationException("Email SMTP server is not configured.");

        if (_settings.Port <= 0)
            throw new InvalidOperationException("Email SMTP port is not configured.");

        if (string.IsNullOrWhiteSpace(_settings.SenderEmail))
            throw new InvalidOperationException("Email sender address is not configured.");

        if (string.IsNullOrWhiteSpace(_settings.Username))
            throw new InvalidOperationException("Email username is not configured.");

        if (string.IsNullOrWhiteSpace(_settings.Password))
            throw new InvalidOperationException("Email password/app password is not configured. Set via environment variable Email__Password or appsettings.Development.json.");
    }

    public async Task SendEmailAsync(
        string to,
        string subject,
        string htmlBody
    )
    {
        if (string.IsNullOrWhiteSpace(to))
            throw new ArgumentException("Recipient email address is required.", nameof(to));

        using var client = new SmtpClient(
            _settings.SmtpServer,
            _settings.Port
        )
        {
            EnableSsl = true,
            UseDefaultCredentials = false,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            Credentials = new NetworkCredential(
                _settings.Username,
                _settings.Password
            ),
            Timeout = 30000
        };

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
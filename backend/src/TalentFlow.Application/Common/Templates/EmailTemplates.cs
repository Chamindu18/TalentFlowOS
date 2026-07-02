namespace TalentFlow.Application.Common.Templates;

public static class EmailTemplates
{
    public static string CandidateWelcome(
        string firstName
    )
    {
        return $$"""
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">

            <h2>Welcome to TalentFlow OS! 🚀</h2>

            <p>Hi {{firstName}},</p>

            <p>
                Your candidate account has been created successfully.
            </p>

            <p>
                You can now:
            </p>

            <ul>
                <li>Browse available jobs</li>
                <li>Apply for opportunities</li>
                <li>Track your applications</li>
                <li>Build your professional profile</li>
            </ul>

            <p>
                We wish you success in your career journey.
            </p>

            <br>

            <p>
                Regards,<br>
                <strong>TalentFlow OS Team</strong>
            </p>

        </body>
        </html>
        """;
    }

    public static string RecruiterWelcome(
        string firstName
    )
    {
        return $$"""
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">

            <h2>Welcome to TalentFlow OS! 🎯</h2>

            <p>Hi {{firstName}},</p>

            <p>
                Your recruiter account has been created successfully.
            </p>

            <p>
                You can now:
            </p>

            <ul>
                <li>Create your company profile</li>
                <li>Post job opportunities</li>
                <li>Review applications</li>
                <li>Manage candidates</li>
            </ul>

            <p>
                Thank you for choosing TalentFlow OS.
            </p>

            <br>

            <p>
                Regards,<br>
                <strong>TalentFlow OS Team</strong>
            </p>

        </body>
        </html>
        """;
    }
}
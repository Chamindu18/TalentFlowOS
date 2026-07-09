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

    public static string ResetPassword(
        string firstName,
        string resetLink
    )
    {
        return $$"""
        <!DOCTYPE html>
        <html>
        <body style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        ">

            <h2>Reset Your Password 🔒</h2>

            <p>Hi {{firstName}},</p>

            <p>
                We received a request to reset your
                TalentFlow OS password.
            </p>

            <p>
                Click the button below to continue:
            </p>

            <p>
                <a
                    href="{{resetLink}}"
                    style="
                        display: inline-block;
                        padding: 12px 24px;
                        background-color: #2563eb;
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: bold;
                    "
                >
                    Reset Password
                </a>
            </p>

            <p>
                This link will expire in
                <strong>15 minutes</strong>.
            </p>

            <p>
                If you didn't request a password reset,
                you can safely ignore this email.
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

    public static string EmailVerification(
        string firstName,
        string verificationLink
    )
    {
        return $$"""
        <!DOCTYPE html>
        <html>
        <body style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        ">

            <h2>Verify Your Email Address ✉️</h2>

            <p>Hi {{firstName}},</p>

            <p>
                Thank you for registering with
                <strong>TalentFlow OS</strong>.
            </p>

            <p>
                Before you can start using your account,
                please verify your email address by
                clicking the button below.
            </p>

            <p>
                <a
                    href="{{verificationLink}}"
                    style="
                        display: inline-block;
                        padding: 12px 24px;
                        background-color: #16a34a;
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: bold;
                    "
                >
                    Verify Email
                </a>
            </p>

            <p>
                This verification link will expire in
                <strong>24 hours</strong>.
            </p>

            <p>
                If you did not create a TalentFlow OS
                account, you can safely ignore this email.
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
namespace TalentFlow.Application.Exceptions.Auth;

public class EmailNotVerifiedException : Exception
{
    public EmailNotVerifiedException()
        : base(
            "Please verify your email before logging in."
        )
    {
    }
}
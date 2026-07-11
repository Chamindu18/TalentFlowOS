namespace TalentFlow.Application.Exceptions.Auth;

public class ExpiredVerificationTokenException : Exception
{
    public ExpiredVerificationTokenException()
        : base(
            "Email verification token has expired."
        )
    {
    }
}
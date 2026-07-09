namespace TalentFlow.Application.Exceptions.Auth;

public class InvalidVerificationTokenException : Exception
{
    public InvalidVerificationTokenException()
        : base(
            "Invalid email verification token."
        )
    {
    }
}
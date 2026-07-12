namespace TalentFlow.Application.Exceptions.Auth;

public class InvalidResetPasswordTokenException : Exception
{
    public InvalidResetPasswordTokenException()
        : base("Invalid password reset token.")
    {
    }
}
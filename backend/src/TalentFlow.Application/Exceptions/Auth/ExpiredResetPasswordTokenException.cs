namespace TalentFlow.Application.Exceptions.Auth;

public class ExpiredResetPasswordTokenException : Exception
{
    public ExpiredResetPasswordTokenException()
        : base("Password reset token has expired.")
    {
    }
}
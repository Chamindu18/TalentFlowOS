namespace TalentFlow.Application.Exceptions.Auth;

public class UserAlreadyExistsException : Exception
{
    public UserAlreadyExistsException(string email)
        : base($"User with email '{email}' already exists.")
    {
    }
}
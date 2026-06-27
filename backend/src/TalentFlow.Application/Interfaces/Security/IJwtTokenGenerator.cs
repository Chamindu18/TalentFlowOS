using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Security;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}
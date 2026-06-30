using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalentFlow.Application.Exceptions;

public class UnauthorizedException : Exception
{
    public UnauthorizedException() : base("Unauthorized")
    {
    }

    public UnauthorizedException(string message) : base(message)
    {
    }
}

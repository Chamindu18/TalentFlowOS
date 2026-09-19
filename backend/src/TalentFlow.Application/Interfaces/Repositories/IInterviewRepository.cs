using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using TalentFlow.Domain.Entities;

namespace TalentFlow.Application.Interfaces.Repositories;

public interface IInterviewRepository
{
    Task<int> GetCountAsync();
}
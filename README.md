# TalentFlow OS

**A recruitment and talent management platform built with ASP.NET Core (Clean Architecture) and React.**
Candidates, recruiters, hiring managers and administrators manage the whole hiring process in one secure web app.

![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=flat-square&logo=csharp&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![EF Core](https://img.shields.io/badge/EF_Core-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![xUnit](https://img.shields.io/badge/xUnit-tested-5E5E5E?style=flat-square)

> Team project (5 members, Group 30) · 2026 · Built for the SE205.3 Software Architecture module, NSBM Green University

---

## What it does

| Role | Can do |
|---|---|
| **Candidate** | Manage profile, resume, education, experience, skills and certificates; browse jobs; apply and track applications |
| **Recruiter** | Manage companies, departments and job vacancies; review applications; shortlist candidates |
| **Hiring Manager** | Schedule interviews, record feedback, evaluate candidates, make hiring decisions |
| **Administrator** | Manage users, roles and organizations |

**Authentication and security:** registration, email verification, login, forgot/reset password, JWT authentication, role-based access control and protected routes.

**AI-assisted features:** resume matching, job recommendations, candidate ranking and resume screening.
<!-- VERIFY: are all four AI features actually implemented? If some are not, list only the working ones here (the old README also listed "Advanced AI Candidate Ranking" as a future item, which contradicts it). -->

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, TanStack Query, Redux Toolkit, Axios, React Hook Form, Zod |
| Backend | ASP.NET Core Web API (C#), Entity Framework Core, AutoMapper, FluentValidation, JWT |
| Database | SQL Server |
| Testing | xUnit (unit and integration tests) |
| DevOps | Docker, GitHub Actions |

<!-- VERIFY (important): is the database SQL Server or PostgreSQL? Check the connection string in appsettings.json and the EF provider package (Microsoft.EntityFrameworkCore.SqlServer vs Npgsql.EntityFrameworkCore.PostgreSQL). Your CV currently says PostgreSQL. Make the README and CV match the code. -->

---

## Architecture

The backend follows **Clean Architecture**. Dependencies point inward, so business rules do not depend on the database or the web framework.

```
API  ──►  Application  ──►  Domain
              ▲
Infrastructure ┘
```

| Project | Responsibility |
|---|---|
| `TalentFlow.API` | Controllers, middleware, authentication, dependency injection |
| `TalentFlow.Application` | Business logic, DTOs, validation, service interfaces |
| `TalentFlow.Domain` | Entities, enums, domain interfaces |
| `TalentFlow.Infrastructure` | EF Core, repositories, identity, email service |

**Patterns used:** Repository, Unit of Work, Dependency Injection.

### Project structure

```
TalentFlowOS
├── frontend/                  React + TypeScript app
├── backend
│   ├── src
│   │   ├── TalentFlow.API
│   │   ├── TalentFlow.Application
│   │   ├── TalentFlow.Domain
│   │   └── TalentFlow.Infrastructure
│   └── tests                  Unit and integration tests
├── docs/
├── docker/
├── deploy/
└── .github/                   CI workflows
```

### Authentication flow

```
Register → Verify email → Login → JWT issued → Role check → Protected resource
```

<!-- VERIFY: the old README listed CQRS under the Application layer but not under patterns. If you really use CQRS/MediatR, add it to "Patterns used". If not, do not claim it. -->

---

## Getting started

### Prerequisites
- .NET SDK (version used by the project)
- Node.js 18+ and npm
- SQL Server instance
- <!-- VERIFY: SMTP settings for the email verification service, if required -->

### Backend

```bash
git clone https://github.com/Chamindu18/TalentFlowOS.git
cd TalentFlowOS/backend
dotnet restore
dotnet build
dotnet run --project src/TalentFlow.API
```

Configure the database connection string and JWT settings in `appsettings.Development.json` (or user secrets) before running.
Swagger UI is available at `https://localhost:<port>/swagger`.

<!-- VERIFY: exact run command/project path, whether migrations run automatically or need "dotnet ef database update", and the names of the config keys (connection string, JWT secret, email). Also confirm whether docker/ contains a compose file and, if so, add "docker compose up" here. -->

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Tests

```bash
dotnet test
```

---

## Team

| Name | GitHub | Module |
|---|---|---|
| Chamindu Hansana (RACH Ranasinghe) | [@Chamindu18](https://github.com/Chamindu18) | Authentication, system integration, infrastructure |
| RPS Tharuka | [@SahanRathnaweera](https://github.com/SahanRathnaweera) | Candidate management |
| MCI Fernando | [@Chami-Ishu](https://github.com/Chami-Ishu) | Recruiter management |
| KN Wickramathilaka | [@kavinadee2](https://github.com/kavinadee2) | Hiring manager |
| HHNV Induwara | [@hhnethsara](https://github.com/hhnethsara) | Administration and AI |

We worked with feature branches (`feature/authentication`, `feature/candidates`, …) merged into `develop` through pull requests, then into `main`.

---

## Roadmap

- Interview and recruitment analytics dashboards
- Email notifications and real-time notifications
- Mobile application
- Cloud deployment

---

*Academic project developed by Group 30, BSc (Hons) Computer Science, Batch 25.1, NSBM Green University.*

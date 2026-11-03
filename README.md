# TalentFlow OS

**A recruitment and talent management platform built with ASP.NET Core using Clean Architecture and React.**

TalentFlow OS supports candidates, recruiters, hiring managers, and administrators across the recruitment lifecycle through a role-based web application.

![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=flat-square&logo=csharp&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![EF Core](https://img.shields.io/badge/EF_Core-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![xUnit](https://img.shields.io/badge/xUnit-tested-5E5E5E?style=flat-square)

> Team project (5 members, Group 30) · 2026 · Developed for the SE205.3 Software Architecture module at NSBM Green University

---

## What it does

| Role | Main capabilities |
|---|---|
| **Candidate** | Manage profile, resume, education, experience, skills and certificates; browse jobs; apply and track applications |
| **Recruiter** | Manage companies, departments and job vacancies; review applications and update application status |
| **Hiring Manager** | Schedule interviews, record feedback, evaluate candidates and make hiring decisions |
| **Administrator** | Manage users, roles, organizations and administrative operations |

### Authentication and security

The platform includes:

- User registration
- Email verification
- Login
- Forgot/reset password workflow
- JWT-based authentication
- Role-based backend authorization
- Protected frontend routes
- Request validation
- BCrypt password hashing

Authorization is enforced by the backend using ASP.NET Core authorization policies and role checks rather than relying only on client-side route protection.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router, Axios, React Hook Form, Zod, shadcn/ui |
| Backend | ASP.NET Core Web API (.NET 8 / C#), Entity Framework Core, AutoMapper, FluentValidation |
| Authentication | JWT, ASP.NET Core Authentication, BCrypt |
| Database | PostgreSQL with Npgsql |
| Testing | xUnit, Moq, FluentAssertions |
| Tooling / Deployment | Docker, Swagger / OpenAPI, Git |

---

## Architecture

The backend follows **Clean Architecture**, separating business rules from infrastructure and delivery concerns.

```text
API  ─────────────► Application ─────────────► Domain
                         ▲
                         │
                  Infrastructure
```

### Layers

| Project | Responsibility |
|---|---|
| `TalentFlow.API` | Controllers, middleware, authentication, API configuration and dependency injection |
| `TalentFlow.Application` | Application services, DTOs, validation and service contracts |
| `TalentFlow.Domain` | Domain entities, enums and repository contracts |
| `TalentFlow.Infrastructure` | Entity Framework Core, PostgreSQL persistence, repositories, authentication and email infrastructure |

### Design patterns and practices

- Repository pattern
- Unit of Work
- Dependency Injection
- Service abstraction
- DTO-based API boundaries
- FluentValidation
- Role-based authorization

---

## Project structure

```text
TalentFlowOS/
├── backend/
│   ├── src/
│   │   ├── TalentFlow.API/
│   │   ├── TalentFlow.Application/
│   │   ├── TalentFlow.Domain/
│   │   └── TalentFlow.Infrastructure/
│   └── tests/
│       ├── UnitTests/
│       ├── IntegrationTests/
│       └── TestUtilities/
│
├── frontend/
│   ├── public/
│   └── src/
│
├── Dockerfile
├── Dockerfile.vercel
└── README.md
```

---

## Authentication flow

```text
Registration
     │
     ▼
Email Verification
     │
     ▼
Login
     │
     ▼
JWT Issued
     │
     ▼
Authenticated Request
     │
     ▼
Backend Role Authorization
     │
     ▼
Protected Resource
```

Both frontend route guards and backend role authorization are used. Backend authorization remains the security boundary.

---

## Testing

The backend includes xUnit unit tests for application services, including authentication workflows.

Authentication tests cover scenarios such as:

- Registration
- Email verification
- Verification-token handling
- Forgot-password workflow
- Password-reset token handling

The project also contains an integration-test project structure for future end-to-end backend integration testing.

Run the backend test projects with:

```bash
cd backend
dotnet test
```

---

## Getting started

### Prerequisites

- .NET 8 SDK
- Node.js and npm
- PostgreSQL
- SMTP configuration for email-based authentication workflows

### 1. Clone the repository

```bash
git clone https://github.com/Chamindu18/TalentFlowOS.git
cd TalentFlowOS
```

### 2. Configure the backend

Configure the required development settings, including:

- PostgreSQL connection string
- JWT secret
- JWT issuer and audience
- SMTP/email credentials
- Frontend URL and allowed origin

Do not commit real database credentials, JWT secrets, SMTP passwords, or other production secrets to Git.

### 3. Run the backend

```bash
cd backend
dotnet restore
dotnet build
dotnet run --project src/TalentFlow.API
```

Swagger/OpenAPI is available from the API's configured development URL when Swagger is enabled.

### 4. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Docker

A multi-stage Docker configuration is included for the ASP.NET Core backend.

The Docker build:

1. Restores the .NET dependencies.
2. Builds and publishes the API using the .NET 8 SDK image.
3. Runs the published application using the ASP.NET Core 8 runtime image.

---

## My contribution

**Chamindu Hansana — Authentication, system integration and infrastructure**

My main contributions included:

- Registration and login workflows
- Email verification
- Forgot-password and password-reset workflows
- JWT authentication
- Role-based authorization
- Authentication-related frontend integration
- Authentication unit testing
- System integration work

---

## Team

| Member | GitHub | Primary area |
|---|---|---|
| Chamindu Hansana | [@Chamindu18](https://github.com/Chamindu18) | Authentication, system integration and infrastructure |
| RPS Tharuka | [@SahanRathnaweera](https://github.com/SahanRathnaweera) | Candidate management |
| MCI Fernando | [@Chami-Ishu](https://github.com/Chami-Ishu) | Recruiter management |
| KN Wickramathilaka | [@kavinadee2](https://github.com/kavinadee2) | Hiring manager |
| HHNV Induwara | [@hhnethsara](https://github.com/hhnethsara) | Administration |

The team used feature branches for individual workstreams and integrated changes through the shared repository.

---

## Future improvements

Potential future improvements include:

- Expanded automated integration testing
- Recruitment analytics improvements
- Real-time notifications
- Additional deployment automation
- Mobile application support

---

*Academic project developed by Group 30, BSc (Hons) Computer Science, Batch 25.1, NSBM Green University.*

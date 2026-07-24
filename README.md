# TalentFlow OS

<p align="center">
  <b>AI-Powered Recruitment & Talent Management Platform</b><br>
  A full-stack web application developed using Clean Architecture to streamline recruitment, candidate management, interview scheduling, and AI-assisted hiring.
</p>

---

# Overview

TalentFlow OS is a centralized recruitment and talent management platform designed to simplify the hiring process for organizations. The system enables Candidates, Recruiters, Hiring Managers, and Administrators to manage recruitment activities within a single secure web application.

The platform provides secure authentication, role-based authorization, candidate management, recruitment workflows, interview management, administration features, and AI-powered resume analysis and job recommendations.

---

# Features

## Authentication & Authorization

- User Registration
- Secure Login
- JWT Authentication
- Email Verification
- Forgot Password
- Reset Password
- Role-Based Access Control (RBAC)
- Protected Routes

## Candidate Module

- Candidate Dashboard
- Profile Management
- Resume Management
- Education Management
- Experience Management
- Skills Management
- Certificate Management
- Browse Jobs
- Job Applications
- Application Tracking

## Recruiter Module

- Recruiter Dashboard
- Company Management
- Department Management
- Job Management
- Create Job Vacancies
- Review Applications
- Candidate Shortlisting

## Hiring Manager Module

- Hiring Manager Dashboard
- Interview Scheduling
- Interview Feedback
- Candidate Evaluation
- Hiring Decisions

## Administration Module

- Administrator Dashboard
- User Management
- Role Management
- Organization Management

## AI Module

- AI Resume Matching
- AI Job Recommendation
- Candidate Ranking
- Resume Screening

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack React Query
- Redux Toolkit
- Axios
- React Hook Form
- Zod

## Backend

- ASP.NET Core Web API
- C#
- Entity Framework Core
- Clean Architecture
- SQL Server
- AutoMapper
- FluentValidation
- JWT Authentication

## Testing

- xUnit
- Unit Testing
- Integration Testing

## DevOps

- Docker
- GitHub Actions
- CI/CD

---

# System Architecture

TalentFlow OS follows **Clean Architecture**, separating responsibilities into independent layers.

```
Presentation Layer
        │
        ▼
Application Layer
        │
        ▼
Domain Layer
        ▲
        │
Infrastructure Layer
```

### Backend Projects

```
backend
└── src
    ├── TalentFlow.API
    ├── TalentFlow.Application
    ├── TalentFlow.Domain
    └── TalentFlow.Infrastructure
```

### Layer Responsibilities

### API

- Controllers
- Middleware
- Authentication
- Dependency Injection
- API Endpoints

### Application

- Business Logic
- CQRS
- Validation
- DTOs
- Interfaces
- Services

### Domain

- Entities
- Domain Models
- Enumerations
- Domain Interfaces

### Infrastructure

- Entity Framework Core
- Database
- Repositories
- Identity
- External Services
- Email Services

---

# Design Patterns

TalentFlow OS implements several software engineering design patterns:

- Repository Pattern
- Unit of Work Pattern
- Dependency Injection

---

# Software Engineering Principles

- Clean Architecture
- SOLID Principles
- Separation of Concerns
- Dependency Inversion
- Modular Design
- RESTful API Design
- Secure Coding Practices

---

# Project Structure

```
TalentFlowOS
│
├── frontend
│
├── backend
│   ├── src
│   │   ├── TalentFlow.API
│   │   ├── TalentFlow.Application
│   │   ├── TalentFlow.Domain
│   │   └── TalentFlow.Infrastructure
│   │
│   └── tests
│       ├── UnitTests
│       ├── IntegrationTests
│       └── TestUtilities
│
├── docs
├── docker
├── deploy
└── .github
```

---

# Authentication Flow

```
User Registration
        │
        ▼
Email Verification
        │
        ▼
User Login
        │
        ▼
JWT Token Generation
        │
        ▼
Role-Based Authorization
        │
        ▼
Protected Resources
```

---

# Branching Strategy

```
main
│
develop
│
├── feature/authentication
├── feature/candidates
├── feature/recruiter
├── feature/hiring
└── feature/admin
```

---

# Git Workflow

### 1. Checkout develop

```bash
git checkout develop
git pull origin develop
```

### 2. Create Feature Branch

```bash
git checkout -b feature/<module-name>
```

### 3. Commit Changes

```bash
git add .
git commit -m "feat(module): description"
```

### 4. Push

```bash
git push origin feature/<module-name>
```

### 5. Create Pull Request

Merge into `develop`.

---

# Team Members

| Student ID | Name | GitHub | Responsibility |
|------------|------|---------|---------------|
| 37014 | **RACH Ranasinghe** | Chamindu18 | Authentication, System Integration, Infrastructure |
| 37058 | **RPS Tharuka** | SahanRathnaweera | Candidate Management Module |
| 37101 | **MCI Fernando** | Chami-Ishu | Recruiter Management Module |
| 36877 | **KN Wickramathilaka** | kavinadee2 | Hiring Manager Module |
| 37171 | **HHNV Induwara** | hhnethsara | Administration & Artificial Intelligence Module |

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/Chamindu18/TalentFlowOS.git
```

---

## Backend

```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Testing

Run Unit Tests

```bash
dotnet test
```

---

# API Documentation

Swagger UI is available when running the backend.

```
https://localhost:<port>/swagger
```

---

# Future Enhancements

- Advanced AI Candidate Ranking
- Interview Analytics
- Recruitment Dashboard Analytics
- Email Notifications
- Mobile Application
- Cloud Deployment
- Real-time Notifications

---

# License

This project was developed for educational purposes as part of the **SE205.3 – Software Architecture** module at **NSBM Green University**.

---

# Contributors

Developed by **Group 30**  
BSc (Hons) Computer Science  
Batch 25.1  
NSBM Green University

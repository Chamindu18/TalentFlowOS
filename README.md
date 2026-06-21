# TalentFlow OS

TalentFlow OS is a full-stack Talent Management System built using modern software engineering principles and Clean Architecture.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS v4
* shadcn/ui
* React Router
* React Query
* Redux Toolkit
* Axios
* React Hook Form
* Zod

### Backend

* ASP.NET Core
* C#
* Clean Architecture
* Entity Framework Core
* SQL Server

### Testing

* xUnit
* Unit Tests
* Integration Tests

### DevOps

* Docker
* GitHub Actions
* CI/CD

---

# Project Structure

```text
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

# Architecture

The backend follows Clean Architecture:

```text
API
↓
Application
↓
Domain

Infrastructure
↑
Application
↓
Domain
```

The Domain layer contains no dependencies.

---

# Branching Strategy

```text
main
│
develop
│
├── feature/authentication
├── feature/candidates
├── feature/jobs
├── feature/interviews
└── feature/admin
```

---

# Git Workflow

1. Pull latest changes:

```bash
git checkout develop
git pull origin develop
```

2. Create a feature branch:

```bash
git checkout -b feature/<module-name>
```

3. Commit changes:

```bash
git add .
git commit -m "feat: description"
```

4. Push branch:

```bash
git push origin feature/<module-name>
```

5. Create a Pull Request into `develop`.

6. Never push directly to `main`.

---

# Team Responsibilities

### Member 1

* Architecture
* Authentication
* Infrastructure
* Docker
* Deployment

### Member 2

* Candidate Module
* Validation
* Unit Testing

### Member 3

* Jobs Module
* Applications Module
* Integration Testing

### Member 4

* Interviews Module
* CI/CD
* GitHub Actions

### Member 5

* Admin Module
* Notifications
* Monitoring
* Logging

---

# Setup

### Backend

```bash
cd backend
dotnet build
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Engineering Principles

* Clean Architecture
* SOLID Principles
* Test-Driven Development
* Modular Design
* Secure Coding Practices
* Continuous Integration
* Continuous Delivery

---

## License

This project is intended for educational and portfolio purposes.

import { Route, Routes , Navigate  } from "react-router-dom";

import CandidateProfilePage from "@/pages/candidate/CandidateProfile";

import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";

import PublicRoute from "@/routes/guards/PublicRoute";
import ProtectedRoute from "@/routes/guards/ProtectedRoute";

import HomePage from "@/pages/home/HomePage";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import EmailVerificationPage from "@/pages/auth/EmailVerificationPage";

import DashboardPage from "@/pages/dashboard/DashboardPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import SettingsPage from "@/pages/settings/SettingsPage";

import CandidateDashboardPage from "@/pages/candidate/CandidateDashboardPage";

import {RecruiterDashboardPage } from "@/pages/recruiter/RecruiterDashboardPage";
import { RecruiterProfilePage } from "@/pages/recruiter/RecruiterProfilePage";



import CompanySetupPage from "@/pages/recruiter/CompanySetupPage";
import { JobsPage } from "@/pages/recruiter/JobsPage";
import { CreateJobPage } from "@/pages/recruiter/CreateJobPage";
import { ApplicationsPage } from "@/pages/recruiter/ApplicationsPage";

import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";

// Hiring Manager Page Imports
import HiringDashboardPage from "@/pages/hiring/HiringDashboard";
import InterviewSchedulingPage from "@/pages/hiring/InterviewScheduling";
import CandidateEvaluationsPage from "@/pages/hiring/CandidateEvaluations";
import InterviewFeedbackPage from "@/pages/hiring/InterviewFeedback";
import HiringDecisionsPage from "@/pages/hiring/HiringDecisions";
// 🎯 Added specialized profile and settings imports here
import HiringProfilePage from "@/pages/hiring/HiringProfilePage";
import HiringSettingsPage from "@/pages/hiring/HiringSettingsPage";



import UnauthorizedPage from "@/pages/errors/UnauthorizedPage";
import NotFoundPage from "@/pages/errors/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={<HomePage />}
        />
      </Route>

      {/* Candidate Routes */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={["Candidate"]}
          />
        }
      >
        <Route element={<DashboardLayout />}>
          <Route
            path="/candidate/dashboard"
            element={<CandidateDashboardPage />}
          />
           <Route
            path="/candidate/profile"
            element={<CandidateProfilePage />}
          />
        </Route>
      </Route>



      {/* Redirects */}
      <Route
       path="/"
       element={<Navigate to="/recruiter/dashboard" replace />}
       />
      <Route
       path="/dashboard"
      element={<Navigate to="/recruiter/dashboard" replace />}
      />  






      {/* Recruiter Routes */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={["Recruiter"]}
          />
        }
      >
        <Route element={<DashboardLayout />}>
          <Route
            path="/recruiter/dashboard"
            element={<RecruiterDashboardPage />}
          />

          <Route
          path="/recruiter/profile"
          element={<RecruiterProfilePage />}
          />

          <Route
            path="/recruiter/setup-company"
            element={<CompanySetupPage />}
          />

          <Route
            path="/recruiter/jobs"
            element={<JobsPage />}
          />

          <Route
            path="/recruiter/jobs/create"
            element={<CreateJobPage />}
          />

          <Route
            path="/recruiter/applications"
            element={<ApplicationsPage />}
          />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={["Admin"]}
          />
        }
      >
        <Route element={<DashboardLayout />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          />
        </Route>
      </Route>

      {/* Hiring Manager Routes */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={["HiringManager"]}
          />
        }
      >
        <Route element={<DashboardLayout />}>
          <Route
            path="/hiring/dashboard"
            element={<HiringDashboardPage />}
          />
          <Route
            path="/hiring/interviews"
            element={<InterviewSchedulingPage />}
          />
          <Route
            path="/hiring/evaluations"
            element={<CandidateEvaluationsPage />}
          />
          <Route
            path="/hiring/feedback"
            element={<InterviewFeedbackPage />}
          />
          <Route
            path="/hiring/decisions"
            element={<HiringDecisionsPage />}
          />
          {/* 🎯 Added unique hiring manager specific workspaces down below */}
          <Route
            path="/hiring/profile"
            element={<HiringProfilePage />}
          />
          <Route
            path="/hiring/settings"
            element={<HiringSettingsPage />}
          />
        </Route>
      </Route>

      {/* Shared Authenticated Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />

          {/* Temporary Legacy Dashboard */}
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />
        </Route>
      </Route>

      {/* Authentication Routes */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route
            path="/reset-password"
            element={<ResetPasswordPage />}
          />
          
          <Route
            path="/email-verification"
            element={<EmailVerificationPage />}
          />
        </Route>
      </Route>

      {/* Unauthorized Page */}
      <Route
        path="/unauthorized"
        element={<UnauthorizedPage />}
      />




      {/* 404 Page */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}
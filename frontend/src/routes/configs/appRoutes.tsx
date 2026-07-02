import { Route, Routes } from "react-router-dom";

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

import DashboardPage from "@/pages/dashboard/DashboardPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import SettingsPage from "@/pages/settings/SettingsPage";

import CandidateDashboardPage from "@/pages/candidate/CandidateDashboardPage";

import RecruiterDashboardPage from "@/pages/recruiter/RecruiterDashboardPage";
import CompanySetupPage from "@/pages/recruiter/CompanySetupPage";
import { JobsPage } from "@/pages/recruiter/JobsPage";
import { CreateJobPage } from "@/pages/recruiter/CreateJobPage";
import { ApplicationsPage } from "@/pages/recruiter/ApplicationsPage";

import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";

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
        </Route>
      </Route>

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
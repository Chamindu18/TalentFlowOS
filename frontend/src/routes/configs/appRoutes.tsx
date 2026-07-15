import { Route, Routes } from "react-router-dom";

// Pages
import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import EmailVerificationPage from "@/pages/auth/EmailVerificationPage";

// Candidate Pages
import CandidateDashboardPage from "@/pages/candidate/CandidateDashboardPage";
import CandidateProfilePage from "@/pages/candidate/CandidateProfile";
import ResumeUpload from "@/pages/candidate/ResumeUpload"; 
import CandidateJobsPage from "@/pages/candidate/CandidateJobsPage"; 
import CandidateAnalyticsPage from "@/pages/candidate/CandidateAnalyticsPage";
import CandidateSettingsPage from "@/pages/candidate/CandidateSettingsPage";

// Recruiter Pages
import { RecruiterDashboardPage } from "@/pages/recruiter/RecruiterDashboardPage";
import CompanySetupPage from "@/pages/recruiter/CompanySetupPage";
import { JobsPage } from "@/pages/recruiter/JobsPage";
import { CreateJobPage } from "@/pages/recruiter/CreateJobPage";
import { ApplicationsPage } from "@/pages/recruiter/ApplicationsPage";
import { RecruiterProfilePage } from "@/pages/recruiter/RecruiterProfilePage";

// Hiring Manager Pages
import HiringDashboardPage from "@/pages/hiring/HiringDashboard";
import InterviewSchedulingPage from "@/pages/hiring/InterviewScheduling";
import CandidateEvaluationsPage from "@/pages/hiring/CandidateEvaluations";
import InterviewFeedbackPage from "@/pages/hiring/InterviewFeedback";
import HiringDecisionsPage from "@/pages/hiring/HiringDecisions";
import HiringProfilePage from "@/pages/hiring/HiringProfilePage";
import HiringSettingsPage from "@/pages/hiring/HiringSettingsPage";

// Admin Pages
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AIResumeMatchingPage from "@/pages/admin/AIResumeMatchingPage";
import AIJobRecommendationPage from "@/pages/admin/AIJobRecommendationPage";
import UserManagementPage from "@/pages/admin/UserManagementPage";

// Shared Pages
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import SettingsPage from "@/pages/settings/SettingsPage";

// Error Pages
import UnauthorizedPage from "@/pages/errors/UnauthorizedPage";
import NotFoundPage from "@/pages/errors/NotFoundPage";

// Layouts & Guards
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import PublicRoute from "@/routes/guards/PublicRoute";
import ProtectedRoute from "@/routes/guards/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Authentication Routes */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/email-verification" element={<EmailVerificationPage />} />
        </Route>
      </Route>

      {/* Candidate Specific Routes */}
      <Route element={<ProtectedRoute allowedRoles={["Candidate"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/candidate/dashboard" element={<CandidateDashboardPage />} />
          <Route path="/candidate/profile" element={<CandidateProfilePage />} />
          <Route path="/candidate/resume" element={<ResumeUpload />} />
          <Route path="/candidate/jobs" element={<CandidateJobsPage />} />
          <Route path="/candidate/analytics" element={<CandidateAnalyticsPage />} />
          <Route path="/candidate/settings" element={<CandidateSettingsPage />} />
        </Route>
      </Route>

      {/* Recruiter Specific Routes */}
      <Route element={<ProtectedRoute allowedRoles={["Recruiter"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/recruiter/dashboard" element={<RecruiterDashboardPage />} />
          <Route path="/recruiter/profile" element={<RecruiterProfilePage />} />
          <Route path="/recruiter/setup-company" element={<CompanySetupPage />} />
          <Route path="/recruiter/jobs" element={<JobsPage />} />
          <Route path="/recruiter/jobs/create" element={<CreateJobPage />} />
          <Route path="/recruiter/applications" element={<ApplicationsPage />} />
        </Route>
      </Route>

      {/* Hiring Manager Specific Routes */}
      <Route element={<ProtectedRoute allowedRoles={["HiringManager"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/hiring/dashboard" element={<HiringDashboardPage />} />
          <Route path="/hiring/interviews" element={<InterviewSchedulingPage />} />
          <Route path="/hiring/evaluations" element={<CandidateEvaluationsPage />} />
          <Route path="/hiring/feedback" element={<InterviewFeedbackPage />} />
          <Route path="/hiring/decisions" element={<HiringDecisionsPage />} />
          <Route path="/hiring/profile" element={<HiringProfilePage />} />
          <Route path="/hiring/settings" element={<HiringSettingsPage />} />
        </Route>
      </Route>

      {/* Admin Specific Routes */}
      <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/ai/resume-matching" element={<AIResumeMatchingPage />} />
          <Route path="/admin/ai/job-recommendations" element={<AIJobRecommendationPage />} />
        </Route>
      </Route>

      {/* Shared/Authenticated Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Error Routes */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
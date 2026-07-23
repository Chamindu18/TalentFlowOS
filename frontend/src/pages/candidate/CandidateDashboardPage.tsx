import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  UserCircle,
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import SectionCard from "@/components/dashboard/SectionCard";
import ProgressCard from "@/components/dashboard/ProgressCard";
import JobCard from "@/components/dashboard/JobCard";
import EmptyState from "@/components/dashboard/EmptyState";

import candidateService from "@/services/candidateService";
import type { CandidateDashboardData } from "@/services/candidateService";

export default function CandidateDashboardPage() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<CandidateDashboardData | null>(
    null,
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const data = await candidateService.getDashboard();

        setDashboard(data);
      } catch (error) {
        console.error("Dashboard Error:", error);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg font-medium">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Welcome Back 👋"
        description="Track your applications and discover your next career opportunity."
        buttonText="Browse Jobs"
        onButtonClick={() => navigate("/candidate/jobs")}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Applications"
          value={dashboard?.totalApplications ?? 0}
          subtitle="Jobs Applied"
          icon={FileText}
        />

        <StatCard
          title="Pending"
          value={
            dashboard?.recentApplications?.filter(
              (a) => a.status === "Applied" || a.status === "Pending",
            ).length ?? 0
          }
          subtitle="Awaiting review"
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Shortlisted"
          value={
            dashboard?.recentApplications?.filter(
              (a) => a.status === "Shortlisted",
            ).length ?? 0
          }
          subtitle="Great progress"
          icon={CalendarDays}
        />

        <StatCard
          title="Profile"
          value={`${dashboard?.profileCompletion ?? 0}%`}
          subtitle="Completion"
          icon={UserCircle}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <SectionCard title="Quick Actions">
            <div className="grid gap-5 md:grid-cols-2">
              <JobCard
                title="Browse Jobs"
                company="Discover new career opportunities"
                location="Explore all available jobs"
                buttonText="Browse Jobs"
                onClick={() => navigate("/candidate/jobs")}
              />

              <JobCard
                title="Complete Profile"
                company="Increase recruiter visibility"
                location="Keep your profile updated"
                buttonText="Edit Profile"
                onClick={() => navigate("/candidate/profile")}
              />

              <JobCard
                title="My Applications"
                company="Track your application progress"
                location="View submitted applications"
                buttonText="View Applications"
                onClick={() => navigate("/candidate/applications")}
              />

              <JobCard
                title="Upload Resume"
                company="Improve your profile"
                location="Keep your latest CV ready"
                buttonText="Upload Resume"
                onClick={() => navigate("/candidate/resume")}
              />
            </div>
          </SectionCard>

          <SectionCard title="🤖 AI Career Tools">
            <div className="grid gap-5 md:grid-cols-2">
              <JobCard
                title="AI Career Assistant"
                company="Discover your ideal career path"
                location="Analyze skills, technologies and interests"
                buttonText="Open Assistant"
                onClick={() => navigate("/ai/career-assistant")}
              />

              <JobCard
                title="AI Job Recommendations"
                company="Personalized opportunities"
                location="Recommended roles based on your skills"
                buttonText="View Recommendations"
                onClick={() => navigate("/ai/job-recommendations")}
              />
            </div>
          </SectionCard>
          
          <SectionCard title="Recent Applications">
            {dashboard &&
            dashboard.recentApplications &&
            dashboard.recentApplications.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left">Job</th>

                      <th className="py-3 text-left">Company</th>

                      <th className="py-3 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dashboard.recentApplications.map((application, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4">{application.jobTitle}</td>

                        <td>{application.companyName}</td>

                        <td>
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-medium
                                ${
                                  application.status === "Applied"
                                    ? "bg-orange-100 text-orange-700"
                                    : application.status === "Shortlisted"
                                      ? "bg-green-100 text-green-700"
                                      : application.status === "Interview"
                                        ? "bg-blue-100 text-blue-700"
                                        : application.status === "Rejected"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-slate-100 text-slate-700"
                                }`}
                          >
                            {application.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                title="No Applications Yet"
                description="Start applying for jobs to track your recruitment progress."
              />
            )}
          </SectionCard>
        </div>

        <div className="space-y-8">
          <ProgressCard percentage={dashboard?.profileCompletion ?? 0} />

          <SectionCard title="Upcoming Interviews">
            <EmptyState
              title="No Interviews"
              description="Interview schedules will appear here."
            />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

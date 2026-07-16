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

  const [dashboard, setDashboard] =
    useState<CandidateDashboardData | null>(null);

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
          title="Saved Jobs"
          value={0}
          subtitle="Coming Soon"
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Interviews"
          value={0}
          subtitle="Upcoming"
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

          <SectionCard title="Recommended Jobs">

            <div className="grid gap-4 md:grid-cols-2">

              <JobCard
                title="Software Engineer"
                company="WSO2"
                location="Colombo"
              />

              <JobCard
                title="Frontend Developer"
                company="Dialog"
                location="Hybrid"
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

                      <th className="py-3 text-left">
                        Job
                      </th>

                      <th className="py-3 text-left">
                        Company
                      </th>

                      <th className="py-3 text-left">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {dashboard.recentApplications.map(
                      (application, index) => (
                        <tr
                          key={index}
                          className="border-b"
                        >
                          <td className="py-4">
                            {application.jobTitle}
                          </td>

                          <td>
                            {application.companyName}
                          </td>

                          <td>

                            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">

                              {application.status}

                            </span>

                          </td>

                        </tr>
                      )
                    )}

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

          <ProgressCard
            percentage={dashboard?.profileCompletion ?? 0}
          />

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
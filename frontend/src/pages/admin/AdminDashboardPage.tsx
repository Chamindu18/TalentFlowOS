import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { adminService } from "@/services/admin.service";
import type { DashboardStats } from "@/types/dashboard";

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const [stats, setStats] =
    useState<DashboardStats>({
      totalUsers: 0,
      totalCandidates: 0,
      totalCompanies: 0,
      totalJobs: 0,
      totalInterviews: 0,
    });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data =
        await adminService.getDashboardStats();

      setStats(data);
    } catch (error) {
      console.error(
        "Failed to fetch dashboard stats",
        error
      );
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      color: "text-blue-600",
    },
    {
      title: "Candidates",
      value: stats.totalCandidates,
      color: "text-green-600",
    },
    {
      title: "Companies",
      value: stats.totalCompanies,
      color: "text-purple-600",
    },
    {
      title: "Jobs",
      value: stats.totalJobs,
      color: "text-orange-600",
    },
    {
      title: "Interviews",
      value: stats.totalInterviews,
      color: "text-pink-600",
    },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Manage users, monitor system health,
          and oversee platform activity.
        </p>
      </div>

      {/* Dashboard Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mt-8">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-slate-500 font-medium">
              {card.title}
            </h3>

            <p
              className={`text-4xl font-bold mt-3 ${card.color}`}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity + System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Recent Activity
          </h2>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-50">
               New user registered
            </div>

            <div className="p-3 rounded-lg bg-slate-50">
               New recruiter created
            </div>

            <div className="p-3 rounded-lg bg-slate-50">
               Interview scheduled
            </div>

            <div className="p-3 rounded-lg bg-slate-50">
               Candidate application submitted
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            System Health
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Database</span>
              <span className="text-green-600 font-semibold">
                Online
              </span>
            </div>

            <div className="flex justify-between">
              <span>API Services</span>
              <span className="text-green-600 font-semibold">
                Healthy
              </span>
            </div>

            <div className="flex justify-between">
              <span>Notifications</span>
              <span className="text-green-600 font-semibold">
                Active
              </span>
            </div>

            <div className="flex justify-between">
              <span>User Authentication</span>
              <span className="text-green-600 font-semibold">
                Running
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Admin Workspace
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <button
            onClick={() =>
              navigate("/admin/users")
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-5 rounded-2xl transition"
          >
            User Management
          </button>

          <button
            onClick={() =>
              navigate("/admin/notifications")
            }
            className="bg-orange-500 hover:bg-orange-600 text-white p-5 rounded-2xl transition"
          >
            Notifications
          </button>

          <button
            onClick={() =>
              navigate("/admin/activity-logs")
            }
            className="bg-green-600 hover:bg-green-700 text-white p-5 rounded-2xl transition"
          >
            Activity Logs
          </button>

          <button
            onClick={() =>
              navigate("/admin/profile")
            }
            className="bg-slate-700 hover:bg-slate-800 text-white p-5 rounded-2xl transition"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
``
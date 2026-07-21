import { useNavigate } from "react-router-dom";

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Users",
      value: 125,
      color: "text-blue-600",
    },
    {
      title: "Total Jobs",
      value: 48,
      color: "text-green-600",
    },
    {
      title: "Applications",
      value: 312,
      color: "text-orange-600",
    },
    {
      title: "Interviews",
      value: 24,
      color: "text-purple-600",
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
          and review platform activities.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-slate-500 font-medium">
              {item.title}
            </h3>

            <p
              className={`text-4xl font-bold mt-3 ${item.color}`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Activity + Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Recent Activity
          </h2>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-50">
              New User Registered
            </div>

            <div className="p-3 rounded-lg bg-slate-50">
              New Job Created
            </div>

            <div className="p-3 rounded-lg bg-slate-50">
              Interview Scheduled
            </div>

            <div className="p-3 rounded-lg bg-slate-50">
              Application Submitted
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
              <span className="text-green-600 font-medium">
                Online
              </span>
            </div>

            <div className="flex justify-between">
              <span>API Services</span>
              <span className="text-green-600 font-medium">
                Healthy
              </span>
            </div>

            <div className="flex justify-between">
              <span>Notifications</span>
              <span className="text-green-600 font-medium">
                Active
              </span>
            </div>

            <div className="flex justify-between">
              <span>AI Engine</span>
              <span className="text-green-600 font-medium">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() =>
              navigate("/admin/users")
            }
            className="bg-orange-500 hover:bg-orange-600 text-white p-5 rounded-2xl transition"
          >
            User Management
          </button>

          <button
            onClick={() =>
              navigate(
                "/admin/ai/resume-matching"
              )
            }
            className="bg-blue-500 hover:bg-blue-600 text-white p-5 rounded-2xl transition"
          >
            Resume Matching
          </button>

          <button
            onClick={() =>
              navigate(
                "/admin/ai/job-recommendations"
              )
            }
            className="bg-green-500 hover:bg-green-600 text-white p-5 rounded-2xl transition"
          >
            AI Recommendations
          </button>

          <button
            className="bg-slate-700 hover:bg-slate-800 text-white p-5 rounded-2xl transition"
          >
            Activity Logs
          </button>
        </div>
      </div>
    </div>
  );
}
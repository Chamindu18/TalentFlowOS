export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-slate-500">
        Under development...
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl border p-6 shadow-sm"
          >
            <h3 className="text-slate-500">
              {item.title}
            </h3>

            <p className="text-4xl font-bold mt-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-xl mb-4">
            Recent Activity
          </h2>

          <div className="space-y-3">
            <div> New User Registered</div>
            <div> Job Created</div>
            <div> Interview Scheduled</div>
            <div> Application Submitted</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-xl mb-4">
            System Health
          </h2>

          <div className="space-y-3">
            <div> Database Online</div>
            <div> API Healthy</div>
            <div> Notifications Active</div>
            <div> AI Services Running</div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button className="bg-orange-500 text-white px-5 py-2 rounded-lg">
          Manage Users
        </button>

        <button className="bg-blue-500 text-white px-5 py-2 rounded-lg">
          AI Dashboard
        </button>

        <button className="bg-slate-700 text-white px-5 py-2 rounded-lg">
          View Logs
        </button>
      </div>
    </div>
  );
}
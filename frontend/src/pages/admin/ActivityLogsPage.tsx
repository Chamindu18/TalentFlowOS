export default function ActivityLogsPage() {
  const logs = [
    {
      action: "User Login",
      user: "Nethsara Induwara",
      time: "09:30 AM",
    },
    {
      action: "Job Created",
      user: "Recruiter User",
      time: "10:10 AM",
    },
    {
      action: "Application Submitted",
      user: "John Doe",
      time: "10:45 AM",
    },
    {
      action: "Interview Scheduled",
      user: "Hiring Manager",
      time: "11:15 AM",
    },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold">
        Activity Logs
      </h1>

      <p className="text-slate-500 mt-2">
        Track user and system activities.
      </p>

      <div className="bg-white rounded-xl border mt-8 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Action</th>
              <th className="text-left p-4">User</th>
              <th className="text-left p-4">Time</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">{log.action}</td>
                <td className="p-4">{log.user}</td>
                <td className="p-4">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
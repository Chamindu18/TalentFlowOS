export default function NotificationsPage() {
  const notifications = [
    {
      title: "New User Registered",
      description: "John Doe has registered.",
      time: "5 minutes ago",
    },
    {
      title: "Interview Scheduled",
      description: "Interview scheduled for Software Engineer position.",
      time: "20 minutes ago",
    },
    {
      title: "Job Application Submitted",
      description: "A candidate applied for Backend Developer.",
      time: "1 hour ago",
    },
    {
      title: "New Recruiter Added",
      description: "Recruiter account approved.",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold">
        Notifications
      </h1>

      <p className="text-slate-500 mt-2">
        View system notifications and important updates.
      </p>

      <div className="mt-8 space-y-4">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border p-5 shadow-sm"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">
                {notification.title}
              </h3>

              <span className="text-sm text-slate-500">
                {notification.time}
              </span>
            </div>

            <p className="mt-2 text-slate-600">
              {notification.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

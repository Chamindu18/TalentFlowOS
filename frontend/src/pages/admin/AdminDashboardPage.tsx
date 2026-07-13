export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Users", value: 125 },
    { title: "Total Jobs", value: 48 },
    { title: "Applications", value: 312 },
    { title: "Interviews", value: 24 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <p className="text-slate-500 mt-2">
        Manage users and monitor system activity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border p-6 shadow-sm bg-white"
          >
            <h3 className="text-gray-500">
              {item.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function UserManagementPage() {
  const users = [
    {
      name: "John Doe",
      email: "john@test.com",
      role: "Candidate",
      status: "Active",
    },
    {
      name: "Jane Smith",
      email: "jane@test.com",
      role: "Recruiter",
      status: "Active",
    },
    {
      name: "Admin User",
      email: "admin@test.com",
      role: "Admin",
      status: "Active",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        User Management
      </h1>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border rounded-xl">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">
                Name
              </th>
              <th className="p-3 text-left">
                Email
              </th>
              <th className="p-3 text-left">
                Role
              </th>
              <th className="p-3 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-t"
              >
                <td className="p-3">
                  {user.name}
                </td>
                <td className="p-3">
                  {user.email}
                </td>
                <td className="p-3">
                  {user.role}
                </td>
                <td className="p-3">
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
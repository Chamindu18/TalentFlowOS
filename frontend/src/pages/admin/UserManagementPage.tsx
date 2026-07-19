export default function UserManagementPage() {
  const users = [
  {
    name: "Nethsara Induwara",
    email: "nethsara@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "John Doe",
    email: "john.doe@gmail.com",
    role: "Candidate",
    status: "Verified",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@gmail.com",
    role: "Recruiter",
    status: "Active",
  },
  {
    name: "Michael Perera",
    email: "michael@gmail.com",
    role: "Hiring Manager",
    status: "Active",
  },
  {
    name: "Sarah Fernando",
    email: "sarah@gmail.com",
    role: "Candidate",
    status: "Pending",
  },
  {
    name: "David Silva",
    email: "david@gmail.com",
    role: "Recruiter",
    status: "Active",
  },
  {
    name: "Kevin Wijesinghe",
    email: "kevin@gmail.com",
    role: "Candidate",
    status: "Verified",
  },
  {
    name: "Amanda Jayasinghe",
    email: "amanda@gmail.com",
    role: "Candidate",
    status: "Pending",
  },
  {
    name: "Robert Brown",
    email: "robert@gmail.com",
    role: "Hiring Manager",
    status: "Active",
  },
  {
    name: "Emily Watson",
    email: "emily@gmail.com",
    role: "Recruiter",
    status: "Verified",
  },
];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">
        User Management
      </h1>

      <div className="flex gap-4 my-6">
        <input
          type="text"
          placeholder="Search users..."
          className="border rounded-lg px-4 py-2"
        />

        <select className="border rounded-lg px-4 py-2">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Recruiter</option>
          <option>Candidate</option>
          <option>Hiring Manager</option>
        </select>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.status}</td>
                <td className="p-4">
                  <button className="text-blue-600 mr-4">
                    Edit
                  </button>

                  <button className="text-red-600">
                    Disable
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";

import { adminService } from "@/services/admin.service";
import type { User } from "@/types/user";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminService.getUsers();

      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`;

    const matchesSearch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "All" ? true : user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold">User Management</h1>

      <p className="text-slate-500 mt-2">
        Manage users, roles and account status.
      </p>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 my-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-4 py-2 flex-1"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option>All</option>
          <option>Admin</option>
          <option>Candidate</option>
          <option>Recruiter</option>
          <option>HiringManager</option>
        </select>
      </div>

      {/* User Count */}
      <div className="mb-4 text-sm text-slate-500">
        Total Users Found: {filteredUsers.length}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
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
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">
                  {user.firstName} {user.lastName}
                </td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    {user.role}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.isEmailVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.isEmailVerified ? "Verified" : "Pending"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setSelectedRole(user.role);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        const confirmed = window.confirm(
                          `Disable ${user.firstName}?`,
                        );

                        if (confirmed) {
                          alert("User disabled");
                        }
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Disable
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[500px]">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>

            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {selectedUser.firstName}{" "}
                {selectedUser.lastName}
              </p>

              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>

              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedUser.isEmailVerified ? "Verified" : "Pending"}
              </p>

              <p>
                <strong>User ID:</strong> {selectedUser.id}
              </p>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Edit User Role</h2>

            <p className="mb-2">
              <strong>User:</strong> {editingUser.firstName}{" "}
              {editingUser.lastName}
            </p>

            <p className="mb-4">
              <strong>Email:</strong> {editingUser.email}
            </p>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option>Admin</option>
              <option>Candidate</option>
              <option>Recruiter</option>
              <option>HiringManager</option>
            </select>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  alert(`Role updated to ${selectedRole}`);
                  setEditingUser(null);
                }}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-200 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

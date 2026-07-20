import { useEffect, useState } from "react";

import { adminService } from "@/services/admin.service";
import type { User } from "@/types/user";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] =
    useState("All");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data =
        await adminService.getUsers();

      setUsers(data);
    } catch (error) {
      console.error(
        "Failed to fetch users",
        error
      );
    }
  };

  const filteredUsers = users.filter(
    (user) => {
      const fullName =
        `${user.firstName} ${user.lastName}`;

      const matchesSearch =
        fullName
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        user.email
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesRole =
        roleFilter === "All"
          ? true
          : user.role === roleFilter;

      return (
        matchesSearch &&
        matchesRole
      );
    }
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold">
        User Management
      </h1>

      <p className="text-slate-500 mt-2">
        Manage users, roles and account
        status.
      </p>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 my-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border rounded-lg px-4 py-2 flex-1"
        />

        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value)
          }
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
        Total Users Found:{" "}
        {filteredUsers.length}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Role
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map(
              (user) => (
                <tr
                  key={user.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {user.firstName}{" "}
                    {user.lastName}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

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
                      {user.isEmailVerified
                        ? "Verified"
                        : "Pending"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        View
                      </button>

                      <button className="text-green-600 hover:text-green-800">
                        Edit
                      </button>

                      <button className="text-red-600 hover:text-red-800">
                        Disable
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
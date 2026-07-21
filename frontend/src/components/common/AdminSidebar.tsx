import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Brain,
  Settings,
  User,
  Bell,
  ClipboardList,
} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();

  const items = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    path: "/admin/users",
    label: "User Management",
    icon: Users,
  },

  {
    path: "/admin/notifications",
    label: "Notifications",
    icon: Bell,
  },

  {
    path: "/admin/activity-logs",
    label: "Activity Logs",
    icon: ClipboardList,
  },

  {
    path: "/admin/profile",
    label: "Profile",
    icon: User,
  },

  {
    path: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-5 border-b">
        <h1 className="text-xl font-bold text-indigo-600">
          TalentFlow Admin
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                location.pathname === item.path
                  ? "bg-indigo-50 text-indigo-600"
                  : "hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
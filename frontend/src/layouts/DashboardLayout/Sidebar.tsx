import { NavLink } from "react-router-dom";

import {
  BarChart3,
  BriefcaseBusiness,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";

import logo from "@/assets/logo/logo.png";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Jobs",
    icon: BriefcaseBusiness,
    path: "/jobs",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    label: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
        hidden
        w-72
        border-r
        border-slate-200
        bg-white
        lg:flex
        lg:flex-col
      "
    >
      <div className="border-b border-slate-100 p-6">
        <img
          src={logo}
          alt="TalentFlow OS"
          className="h-10 w-auto"
        />
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-2xl
                px-4
                py-3
                text-sm
                font-semibold
                transition-all
                duration-300
                ${
                  isActive
                    ? "bg-[#FFF3EC] text-[#FF5B1F]"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `
              }
            >
              <Icon className="h-5 w-5" />

              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
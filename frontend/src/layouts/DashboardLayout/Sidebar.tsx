import { NavLink } from "react-router-dom";

import {
  BarChart3,
  BriefcaseBusiness,
  LayoutDashboard,
  Settings,
  User,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            lg:hidden
          "
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-72
          flex-col
          border-r
          border-slate-200
          bg-white
          transition-transform
          duration-300
          lg:static
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-100
            p-6
          "
        >
          <h1
            className="
              text-2xl
              font-bold
              text-[#FF5B1F]
            "
          >
            TalentFlow
          </h1>

          <button
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={onClose}
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
    </>
  );
}
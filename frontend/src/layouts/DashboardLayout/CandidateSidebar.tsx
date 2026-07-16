import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  FileBadge2,
  X,
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/candidate/dashboard",
  },
  {
    label: "Browse Jobs",
    icon: BriefcaseBusiness,
    path: "/candidate/jobs",
  },
  {
    label: "My Applications",
    icon: FileText,
    path: "/candidate/applications",
  },
  {
    label: "Resume",
    icon: FileBadge2,
    path: "/candidate/resume",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    path: "/candidate/analytics",
  },
  {
    label: "Profile",
    icon: User,
    path: "/candidate/profile",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/candidate/settings",
  },
];

export default function CandidateSidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200
           bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}

        <div className="border-b border-slate-200 px-6 py-5">

          <h1 className="text-3xl font-bold text-[#FF5B1F]">
            TalentFlow
          </h1>

          <p className="mt-2 text-sm text-slate-500 font-semibold">
            Candidate Portal
          </p>

          <button
            onClick={onClose}
            className="absolute right-5 top-5 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 px-4 py-4">

          {navigation.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-4 rounded-2xl px-4 py-3 font-medium transition-all duration-200 ${
                    isActive
                      ? "border-l-4 border-[#FF5B1F] bg-orange-50 text-[#FF5B1F]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="h-5 w-5" />

                <span>{item.label}</span>
              </NavLink>
            );
          })}

        </nav>

        {/* Bottom */}

        <div className="border-t border-slate-200 p-5">

          <div className="mb-5 rounded-2xl bg-slate-50 p-4">

            <h3 className="font-semibold text-slate-800">
              Need Help?
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              Contact the TalentFlow support team.
            </p>

            <p className="mt-2 text-sm font-medium text-[#FF5B1F]">
              support@talentflow.com
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-red-500 transition-all hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />

            Logout
          </button>

        </div>
      </aside>
    </>
  );
}